import express from 'express';
import "dotenv/config";
import { PrismaClient } from './generated/prisma/client.js';

const app = express();
const prisma = new PrismaClient();

const rota = 3000;

app.use(express.json());


app.post('/usuarios', async (req, res) => {
    const { name, email, age } = req.body

    await prisma.user.create({
        data: {
            name,
            email,
            age
        }
    })

    return res.status(201).send("Usuário criado")

})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany();

    res.status(200).json(users);
})

app.put('/usuarios/:id', async (req, res) => {

    const { name, email, age } = req.body

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name,
            email,
            age
        }
    })

    return res.status(201).send("Usuário criado")

})

app.listen(rota, () => {
    console.log(`Rota em https://localhost${rota}`);
}
)

/*
    Criar uma API de usuarios

    - criar um usuario
    - listar usuarios
    - atualizar usuarios
    - deletar usuarios

*/