// Importa o roteamento do express
const { Router } = require('express');
const devsController = require('./controllers/devsController');
const searchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP- Principais: GET, POST, PUT, DELETE
// Recebe algo da página e responde na porta 3333
// async indica que deve espear a resposta da url do git para, depois, enviar a resposta
routes.post('/devs', devsController.store);
routes.get('/devs', devsController.index);
routes.get('/search', searchController.index);

// Exporta as rotas (caminhos) para a aplicação
module.exports = routes;