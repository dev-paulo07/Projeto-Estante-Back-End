const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Alerta do Banco: Ainda não foi possível conectar ao banco de dados físico.');
        console.error('Detalhe do erro:', err.message);
    } else {
        console.log('Banco de Dados do Render conectado com sucesso');
    }
});

module.exports = pool;
