const {Router} = require('express');
const ONUsController = require('./controllers/ONUsController');

const routes= Router();

routes.get('/ONUS',ONUsController.index);
routes.post('/ONUS', ONUsController.store);

module.exports = routes; 