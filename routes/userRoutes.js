const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../middleware/authenticate');

router.get('/users', verifyUser, verifyAdmin, userController.getUsers);

module.exports = router;