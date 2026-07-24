const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
// 1. Importa as rotas de autenticação que você acabou de criar
const authRoutes = require('./routes/authRoutes');
// 1. Importa as rotas de livros
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json()); // Permite que o servidor entenda JSON enviado pelo frontend

// 2. Vincula as rotas de autenticação ao servidor
// Isso significa que toda rota dentro de authRoutes começará com "/auth" (ex: /auth/login)
app.use('/auth', authRoutes);
// 2. Registra as rotas de livros no caminho /livros
app.use('/livros', bookRoutes);

// Rota de teste para saber se o servidor está vivo
app.get('/', (req, res) => {
    res.json({ message: "API da Estante está rodando normalmente" });
});

// Inicialização do servidor na porta configurada no .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});