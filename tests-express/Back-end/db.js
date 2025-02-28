// database.js
const Database = require('better-sqlite3');

// Cria ou abre o arquivo do banco de dados
const db = new Database('database.db');

// Cria uma tabela de exemplo (se não existir)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
  )
`);

module.exports = db;