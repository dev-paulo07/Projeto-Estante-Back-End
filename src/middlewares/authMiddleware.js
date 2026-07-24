const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token de autenticação não fornecido.' });
    }

    try {
        const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = usuarioDecodificado;

        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
    }
};

module.exports = autenticarToken;
