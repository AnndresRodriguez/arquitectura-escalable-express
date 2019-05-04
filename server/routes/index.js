/*Primero, requiera la carpeta apiRoute que vamos a crear a continuación.
Esta carpeta contendrá otra carpeta con el número de versión de la API,
es decir v1 .*/

const apiRoute = require('./apis');

/*Segundo crear una función init. Estamos llamando a esta función
desde el archivo server/index.js dentro de la función create 
en la parte inferior y la pasamos server como un parámetro. 
Simplemente obtiene todas las rutas y devuelve las funciones next y callback*/

function init(server) {
  server.get('*', function (req, res, next) {
    console.log('Petición realizada desde: ' + req.originalUrl);
    return next();
  });
  server.use('/api', apiRoute);
}

/*
Luego use el apiRoute que estamos solicitando arriba.
Finalmente, exporte la función init para que esta 
función esté disponible en el resto del proyecto. 
*/
module.exports = {
  init: init
};