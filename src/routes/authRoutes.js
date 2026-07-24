const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define que quando houver um POST para /auth/login, chama a função de login do controller
router.post('/login', authController.login);

module.exports = router;