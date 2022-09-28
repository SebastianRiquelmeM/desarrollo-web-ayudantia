import express from 'express';
import { resolve } from 'path';
import htmlExpress, { staticIndexHandler } from '../src/index.js';

//seteamos el directorio
const __dirname = resolve();

console.log("constante de directorio ___dirname: ",__dirname);
// home/seba/Escritorio/Ayudantía/ayudantia 5


//Iniciamos la app express
const app = express();

//Incluimos funciones del proyecto
app.engine(
  'js',
  htmlExpress({
    includesDir: 'includes',
  })
);


//view engine js quiere decir que nuestro sistema de vistas será js
app.set('view engine', 'js');

// home/seba/Escritorio/Ayudantía/ayudantia 5 = ${___dirname}
// Entonces `${__dirname}/example/public`
// Es lo mismo que 
// home/seba/Escritorio/Ayudantía/ayudantia 5/example/public

// Entonces, indico donde estan mis views
app.set('views', `${__dirname}/example/public`);

// serve all other static files like CSS, images, etc
app.use(express.static(`${__dirname}/example/public`));

// En la ruta /hello renderizo la view hello
// con el parámetro name con 'word' como contenido, es decir, name: 'word'
// visitar localhost/hello
app.get('/hello', async function (req, res) {
  res.render('hello', {
    name: 'world',
  });
});


// Automatically serve any index.js file as HTML in the public directory
app.use(
  staticIndexHandler({
    viewsDir: `${__dirname}/example/public`,
    notFoundView: 'not-found', // OPTIONAL: defaults to `404/index`
  })
);

export default app;
