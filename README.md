# **Estante - Gerenciador de Leitura (Back-End API)**

## **Desenvolvedor:**
* Paulo Castro

> Esta é a API RESTful desenvolvida para a AV2 do Oxetech no curso de Desenvolvimento Web Full Stack. O sistema gerencia a autenticação de usuários, regras de negócio e o controle de CRUD completo dos livros na estante, com persistência relacional em nuvem.

## **Credenciais para Teste:**
Para testar a aplicação publicada e a proteção de rotas via JWT, utilize a conta de testes abaixo:

* **E-mail:** `usuario.teste@email.com`
* **Senha:** `estante123`


## **Links da Aplicação:**
* **Aplicação Publicada (Front-End - Vercel):** `https://projeto-estante-three.vercel.app`
* **API em Nuvem (Back-End - Render):** `https://projeto-estante-back-end.onrender.com`


## **Tecnologias Utilizadas & Deploy:**
* **Node.js** (Ambiente de execução)
* **Express.js** (Framework web para API REST)
* **PostgreSQL** (Banco de dados relacional)
* **JWT (JSON Web Token)** (Autenticação e controle de acesso)
* **Bcrypt.js** (Criptografia e hashing de senhas)
* **CORS** (Configuração de origens permitidas)
* **Dotenv** (Gerenciamento de variáveis de ambiente)
* **Render** (Hospedagem da API e Banco de Dados PostgreSQL)
* **Vercel** (Hospedagem do Front-End)


## **Arquitetura e Organização (MVC):**
O projeto segue o padrão arquitetural **MVC**, garantindo separação clara de responsabilidades:

* `src/models/`: Definição e comunicação direta com as tabelas do PostgreSQL.
* `src/controllers/`: Regras de negócio da aplicação e manipulação das requisições/respostas.
* `src/routes/`: Mapeamento dos endpoints da API (`/auth` e `/livros`).
* `src/middlewares/`: Validação de tokens JWT e tratamento de autorizações (401/403).


## **Endpoints Principais da API:**

### Autenticação (`/auth`)
* `POST /auth/login` — Autentica o usuário e retorna o token JWT.

### Livros (`/livros`)
* `GET /livros` — Lista os livros cadastrados na estante.
* `POST /livros` — Cadastra um novo livro na estante *(Requer Token JWT)*.
* `PUT /livros/:id` — Atualiza informações de um livro *(Requer Token JWT)*.
* `DELETE /livros/:id` — Remove um livro da estante *(Requer Token JWT)*.
