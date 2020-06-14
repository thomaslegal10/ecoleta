import express from 'express';

const app = express();

app.use(express.json());

// Rota: Endereço completo da nossa requisição
// Recurso: Qual entidade a gente acessa do sistema

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

// POST http://localhost:3333/users = Criar um usuário
// GET http://localhost:3333/users = Listar usuários
// GET http://localhost:3333/users/5 = Buscar dados do usuário com ID 5

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros e paginação, etc..
// Request Body: Parâmetros para criação/atualização de informações

const users = [
    'Diego', // 0
    'Cleiton', // 1
    'Robson', // 2
    'Igor' // 3
];

app.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    // JSON

    return response.json(filteredUsers);
})

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
})

app.post('/users', (request, response) => {
    const user = request.body;

    console.log(user);

    const userReturn = {
        "name": user.name,
        "email": user.email
    }

    return response.json(userReturn);
})

app.listen(3333);

