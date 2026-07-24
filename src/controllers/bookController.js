const db = require('../config/db');

// 1. READ: Listar todos os livros cadastrados
const listarLivros = async (req, res) => {
    try {
        // Busca todos os livros no banco, do mais recente para o mais antigo
        const resultado = await db.query('SELECT * FROM livros ORDER BY id DESC');
        return res.json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return res.status(500).json({ error: 'Erro ao buscar livros no banco de dados.' });
    }
};

// 2. CREATE: Cadastrar um novo livro
const criarLivro = async (req, res) => {
    const { titulo, status, genero } = req.body;

    // Validação básica para garantir que o título e o status foram preenchidos
    if (!titulo || !status) {
        return res.status(400).json({ error: 'O título e o status são obrigatórios.' });
    }

    try {
        const query = 'INSERT INTO livros (titulo, status, genero) VALUES ($1, $2, $3) RETURNING *';
        const valores = [titulo, status, genero || ''];
        
        const resultado = await db.query(query, valores);

        // Retorna o livro recém-criado com o ID gerado pelo banco
        return res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        return res.status(500).json({ error: 'Erro ao salvar o livro no banco de dados.' });
    }
};

// 3. DELETE: Apagar um livro pelo ID
const deletarLivro = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM livros WHERE id = $1 RETURNING *';
        const resultado = await db.query(query, [id]);

        // Se a busca por esse ID não encontrou nenhuma linha para apagar
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        return res.json({ message: 'Livro removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        return res.status(500).json({ error: 'Erro ao deletar o livro do banco de dados.' });
    }
};

// 4. UPDATE: Atualizar dados de um livro (mudar status, título ou gênero)
const atualizarLivro = async (req, res) => {
    const { id } = req.params;
    const { titulo, status, genero } = req.body;

    // Validação dos campos obrigatórios
    if (!titulo || !status) {
        return res.status(400).json({ error: 'O título e o status são obrigatórios para a atualização.' });
    }

    try {
        const query = `
            UPDATE livros 
            SET titulo = $1, status = $2, genero = $3 
            WHERE id = $4 
            RETURNING *
        `;
        const valores = [titulo, status, genero || '', id];
        const resultado = await db.query(query, valores);

        // Se o ID informado não existir no banco
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Livro não encontrado para atualização.' });
        }

        // Retorna o livro com os dados atualizados
        return res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar o livro no banco de dados.' });
    }
};

module.exports = {
    listarLivros,
    criarLivro,
    deletarLivro,
    atualizarLivro
};