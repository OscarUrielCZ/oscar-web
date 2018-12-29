'use strict'

const mongoose = require('mongoose');

const app = require('./app.js');

const ruta_bd = 'mongodb://localhost:27017/portafolio';

mongoose.Promise = global.Promise;
mongoose.connect(ruta_bd)
       .then(() => {
         console.log('Conexión exitosa a ', ruta_bd);
         app.listen(app.get('port'), () => {
           console.error('Server on port', app.get('port'));
         });
       })
       .catch(err => console.error('Error en la conexión a la BD: ', err));
