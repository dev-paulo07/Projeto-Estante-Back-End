const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const USUARIO_TESTE = {
    email: 'usuario.teste@email.com',
    senhaAberta: 'estante123'
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email !== USUARIO_TESTE.email) {
            return res.status(401).json({ error: 'Credenciais inválidas. Verifique o e-mail.' });
        }

        if (password !== USUARIO_TESTE.senhaAberta) {
            return res.status(401).json({ error: 'Credenciais inválidas. Verifique a senha.' });
        }

        const token = jwt.sign(
            { user: USUARIO_TESTE.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        return res.json({
            message: 'Login realizado com sucesso! Seja bem-vindo.',
            token: token
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno no servidor ao tentar logar.' });
    }
};

module.exports = { login };
