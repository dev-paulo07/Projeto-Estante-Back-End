const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Definindo as credenciais fixas do nosso Usuário de Teste
const USUARIO_TESTE = {
    email: 'usuario.teste@email.com',
    // Senha limpa que o professor vai usar, mas que vamos validar de forma segura
    senhaAberta: 'estante123'
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Valida se o e-mail digitado é o do usuário de teste
        if (email !== USUARIO_TESTE.email) {
            return res.status(401).json({ error: 'Credenciais inválidas. Verifique o e-mail.' });
        }

        // 2. Valida se a senha digitada bate com a senha do usuário de teste
        if (password !== USUARIO_TESTE.senhaAberta) {
            return res.status(401).json({ error: 'Credenciais inválidas. Verifique a senha.' });
        }

        // 3. Se passou pelas validações, gera o Token JWT que expira em 2 horas
        const token = jwt.sign(
            { user: USUARIO_TESTE.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );

        // 4. Retorna o sucesso e o Token para o Frontend guardar
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