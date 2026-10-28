const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/dashboard', isAdmin, adminController.getDashboard);
router.get('/users', isAdmin, adminController.getUsers);
router.get('/users/:id', isAdmin, adminController.getUserDetails);
router.get('/users/delete/:id', isAdmin, adminController.deleteUser);

module.exports = router;