'use strict'

const mongoose = require('mongoose');
const app = require('./app');
let port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myconta', {useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => {
		console.log('Conexión a la BBDD establecida con éxito...');

		// Creamos el servidor Nodejs
		app.listen(port, () => {
			console.log('Servidor ejecutándose correctamente en la url localhost:3700...');
		});
	})
	.catch(err => {
		console.log(err);
	});