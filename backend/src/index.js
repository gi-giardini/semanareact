// A variável express permitirá que as funcionalidades do micro framework express
// sejam acessadas. Trata das rotas/caminhos da aplicação
const express = require('express');

// Aplicação para utilizar o banco de dados
const mongoose = require('mongoose');

//Extensão que remove bloqueio de acesso de um único endereço
const cors = require('cors');

// Importa as rotas definidas em routes.js
const routes = require('./routes');

// Início do servidor no ar
const app = express();

// Conexão com o servidor
mongoose.connect('mongodb+srv://semanaReact:flash98riverdale@cluster0-bjvu4.mongodb.net/semanareact?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());

// Express não "entende", inicialmente o formato json. Então precisamos informar para ele
app.use(express.json());
// .use indica que vale para todas as requisições (poderia usar .get e só valeria nas requisições get())

app.use(routes);

// Tipos de parâmetros:

// Query Params: usando em GET. req.query (filtros, ordenação, paginação. ...)
// Route Params: usado em PUT e DELETE. request.params (identificar um recurso na alteração ou remoção)
// Body: usado em POST  e PUT. requst.body (dados para criação ou alteração de um registro)
// deve ser inserido entre {} e aspas duplas (formato json)

// Escolhe a porta do localhost onde a página inicial será acessada no navegador
app.listen(3333);