const { request } = require('express'); // Importando framework express 
const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://wena:virtextelecom@cluster0.8pktl.mongodb.net/virtex?retryWrites=true&w=majority');

app.use(cors('http://localhost:3000/'));
app.use(express.json());
app.use(routes);

app.listen(3333);