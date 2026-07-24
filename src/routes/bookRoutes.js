const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const autenticarToken = require('../middlewares/authMiddleware');

// 🌐 Rota PÚBLICA: qualquer um pode ver os livros na tela
router.get('/', bookController.listarLivros);         // READ (Listar)

// 🛡️ Rotas PROTEGIDAS: exigem Token JWT para alterar os dados
router.post('/', autenticarToken, bookController.criarLivro);          // CREATE (Criar)
router.put('/:id', autenticarToken, bookController.atualizarLivro);     // UPDATE (Atualizar)
router.delete('/:id', autenticarToken, bookController.deletarLivro);   // DELETE (Apagar)

module.exports = router;