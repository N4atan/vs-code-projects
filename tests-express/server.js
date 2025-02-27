const express = require('express')
const db = require('./db.js');

const { v4: uuidv4 } = require('uuid');
const { hashPassword, comparePassword } = require('./auth.js');



const port = 3000
const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
        const {nome, email, senha} = req.body;

        try{
            let id = uuidv4();
            let senhaCripto = await hashPassword(senha);

            const stmt = db.prepare("INSERT INTO users (id, nome, email, senha) VALUES (?, ?, ?, ?)");

            const resultado = stmt.run(id, nome, email, senhaCripto);

            res.status(201).json({id});
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});