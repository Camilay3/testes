const express = require('express');
const path = require('path');

const app = express();
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.set('view engine', 'hbs');

// Partials
const hbs = require('hbs');

// Definindo rotas
app.use('/', require('./routes/pages'));

app.listen(3000, () => {
    console.log("Servidor ligado");
});