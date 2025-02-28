const express = require('express')
const db = require('./db.js');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const { v4: uuidv4 } = require('uuid');
const { hashPassword, comparePassword } = require('./auth.js');


const secretKey = "minha_chave_secreta"
const port = 3000
const app = express();

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        let id = uuidv4();
        let senhaCripto = await hashPassword(senha);

        const stmt = db.prepare("INSERT INTO users (id, nome, email, senha) VALUES (?, ?, ?, ?)");

        const resultado = stmt.run(id, nome, email, senhaCripto);

        res.status(201).json({ id });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get("/users", (req, res) => {
    try {
        const stmt = db.prepare("SELECT * FROM users")

        const resultado = stmt.all();

        res.status(200).json({ resultado })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

})

app.post("/login", async (req, res) => {
    console.log("Inicando o endpoint", req.body)
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios!" });
    }

    // Correção: usando `prepare().get()` do better-sqlite3
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    const linha = stmt.get(email); // Agora funciona corretamente!

    console.log("Resultado da linha", linha)

    if (!linha) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    try {
        const resultado = await comparePassword(senha, linha.senha);

        if (!resultado) {
            return res.status(401).json({ error: "Credenciais inválidas!" });
        }

        const token = jwt.sign({ id: linha.id }, secretKey, { expiresIn: "1h" });

        res.json({ message: "Login bem-sucedido!", token });

    } catch (err) {
        console.error("Erro ao comparar senha:", err.message);
        return res.status(500).json({ error: "Erro no servidor" });
    }
});