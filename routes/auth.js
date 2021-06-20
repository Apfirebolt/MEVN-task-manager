const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    updatePassword,
    updateUserProfile,
} = require('../controllers/authController.js')
const { protect } = require('../middleware/authMiddleware.js');

router.route('/signup').post(registerUser);
router.route('/signin').post(authUser);
router.route('/update-password').post(protect, updatePassword);
router.route('/settings').post(protect, updateUserProfile);
router.route('/profile').get(protect, getUserProfile)

module.exports = router
