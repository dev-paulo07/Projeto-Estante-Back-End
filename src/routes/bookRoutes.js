const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const autenticarToken = require('../middlewares/authMiddleware');

router.get('/', bookController.listarLivros);

router.post('/', autenticarToken, bookController.criarLivro);         
router.put('/:id', autenticarToken, bookController.atualizarLivro);     
router.delete('/:id', autenticarToken, bookController.deletarLivro);   

module.exports = router;
