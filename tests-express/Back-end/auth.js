// auth.js
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rounds para o salt (quanto maior, mais seguro, mas mais lento)

// Função para criar um hash da senha
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Função para verificar se a senha está correta
async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

module.exports = { hashPassword, comparePassword };