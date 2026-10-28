const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const authController = require('../controllers/authController');

router.get('/signup', authController.getSignup);
router.post('/signup', upload.single('pet_image'), authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);

module.exports = router;