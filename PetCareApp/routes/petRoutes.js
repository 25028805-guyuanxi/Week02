const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { isLoggedIn } = require('../middleware/auth');
const petController = require('../controllers/petController');

router.get('/new', isLoggedIn, petController.getNewPet);
router.post('/', isLoggedIn, upload.single('pet_image'), petController.postNewPet);

module.exports = router;