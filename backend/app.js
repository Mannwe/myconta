'use strict'

/** Importaciones **/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/** Archivos de rutas **/
const accountRoutes = require('./routes/account');
const subaccountRoutes = require('./routes/subaccount');
const balanceRoutes = require('./routes/balance');
const movementRoutes = require('./routes/movement');
const budgetRoutes = require('./routes/budget');
const templateRoutes = require('./routes/template');
const annotationRoutes = require('./routes/annotation');
const transferRoutes = require('./routes/transfer');

/** Middlewares **/
// Convertimos lo que nos llegue en un objeto json
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas (middlewares)
app.use('/api', accountRoutes);
app.use('/api', subaccountRoutes);
app.use('/api', balanceRoutes);
app.use('/api', movementRoutes);
app.use('/api', budgetRoutes);
app.use('/api', templateRoutes);
app.use('/api', annotationRoutes);
app.use('/api', transferRoutes);

// Exportamos
module.exports = app;