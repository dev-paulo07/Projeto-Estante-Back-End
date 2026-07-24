const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticarToken = (req, res, next) => {
    // 1. Busca o cabeçalho 'Authorization' enviado pelo frontend
    const authHeader = req.headers['authorization'];
    
    // O cabeçalho geralmente vem no formato: "Bearer TOKEN_AQUI"
    // O .split(' ')[1] pega apenas a segunda parte, que é o token propriamente dito
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Se nenhum token foi enviado no cabeçalho, barra imediatamente
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token de autenticação não fornecido.' });
    }

    try {
        // 3. Tenta verificar/descriptografar o token usando a nossa chave secreta do .env
        const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Anexa as informações do usuário logado na requisição para que as próximas funções saibam quem ele é
        req.user = usuarioDecodificado;

        // 5. "Chave verde": autoriza a requisição a continuar para a rota final
        next();
    } catch (error) {
        // Se o token for alterado, inválido ou expirou (passou de 2 horas)
        return res.status(403).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
    }
};

module.exports = autenticarToken;