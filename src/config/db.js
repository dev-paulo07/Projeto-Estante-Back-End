const { Pool } = require('pg');
require('dotenv').config();

// O Pool aceita a URL inteira diretamente através de connectionString
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Obrigatório para conexões seguras na nuvem (Render)
    }
});

// Teste rápido de conexão
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Alerta do Banco: Ainda não foi possível conectar ao banco de dados físico.');
        console.error('Detalhe do erro:', err.message);
    } else {
        console.log('Banco de Dados do Render conectado com sucesso');
    }
});

module.exports = pool;