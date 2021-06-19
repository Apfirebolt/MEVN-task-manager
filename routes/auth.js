const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
} = require('../controllers/authController.js')
const { protect } = require('../middleware/authMiddleware.js');

router.route('').get((req, res) => {
    res.json({
        name: 'Ping John'
    })
})
router.route('/signup').post(registerUser);
router.route('/signin').post(authUser);
router.route('/profile').get(protect, getUserProfile)

module.exports = router
