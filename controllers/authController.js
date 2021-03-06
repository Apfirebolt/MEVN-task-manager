const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel.js')


module.exports.authUser = (async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    } catch(err) {
        res.status(401).json({
            message: err.message ? err.message : 'Something went wrong'
        })
    }
})

module.exports.registerUser = (async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(409).json({
                message: 'User already exists'
            })
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            password,
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message ? err.message : 'Something went wrong'
        });
    }
})

module.exports.getUserProfile = (async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            res.json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch(err) {
        res.status(400).json({
            message: err.message ? err.message : 'Please login to continue'
        });
    }
})


module.exports.updateUserProfile = (async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate({_id: req.user._id}, req.body, {
            returnOriginal: false
        });
        if (updatedProfile) {
            res.status(200).json({
                message: 'Profile successfully updated',
                data: updatedProfile
            })
        }
    } catch(err) {
        res.status(404).json({
            message: err.message ? err.message : 'Some error occurred'
        });
    }
})

module.exports.updatePassword = (async (req, res) => {
    try {
        const changedPassword = await User.findOneAndUpdate({_id: req.user._id}, req.body, {
            returnOriginal: false
        });
        if (changedPassword) {
            res.status(200).json({
                message: 'Password successfully updated',
                data: changedPassword
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message ? err.message : 'Please login to continue'
        });
    }
})
