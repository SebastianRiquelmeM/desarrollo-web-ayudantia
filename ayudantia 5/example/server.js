import app from './app.js';
import reload from 'reload';
import chokidar from 'chokidar';

const port = 2222;

// reload browser on file changes
// Ejecuta nuestra app y la recarga ante cualquier cambio en un archivo
reload(app, { verbose: true })
  .then(function (reloadReturned) {
    chokidar.watch(['./src', './example']).on('all', (/*event, path*/) => {
      reloadReturned.reload();
    });

    //Inicia nuestra app en la direccion indicada
    app.listen(port, function () {
      console.log(`Server started at http://localhost:${port}`);
    });
  })

  //catch se ejecuta si ocurre un error
  .catch(function (err) {
    console.error('Reload could not start, could not start example app', err);
  });
