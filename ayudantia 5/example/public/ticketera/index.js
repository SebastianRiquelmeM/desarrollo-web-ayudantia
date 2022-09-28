import { html } from '../../../src/index.js';

export const view = (data, state) => html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
    

</head>
<body>



      <div class="jumbotron jumbotron-fluid">
        <nav id="navbar" class="navbar navbar-expand-lg navbar-light fixed-top">
          <a class="navbar-brand text-light" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link text-light" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light disabled">Disabled</a>
              </li>
      
            </ul>
  
            <button type="button" class="btn btn-light ml-3" data-toggle="modal" data-target="#modalIniciarSesion">Iniciar sesión</button>
            <button type="button" class="btn btn-light ml-3" data-toggle="modal" data-target="#modalRegistro">Registrarse</button>
          </div>
        </nav>
        <div class="container">
          <h1 class="display-4 text-center text-light font-weight-bold"><ion-icon name="ticket-outline"></ion-icon></h1>
          <h1 class="display-4 text-center text-light font-weight-bold"> Ticketera</h1>
        </div>
        <p class="text-right mr-2 text-light" id="creditosPortada"><small>Foto de <a id="creditosLink1" class="text-light" href="https://unsplash.com/@yvettedewit?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yvette de Wit</a> en <a class="text-light" id="creditosLink2" href="https://unsplash.com/es/s/fotos/concert?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small></p>
      </div>
      
  
      <div class="container-sm mt-5 mb-5">
          <div class="input-group mb-5">
            <input type="text" id="buscar" class="form-control shadow" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
            <div class="input-group-append">
              <!-- <button class="btn btn-outline-secondary mr-5" type="button" id="button-addon2">Button</button> -->
              <div class="dropdown">
                <button id="botonCat" class="btn btn-secondary dropdown-toggle grisClaro" type="button" data-toggle="dropdown" aria-expanded="false">
                  Categoría
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Infantil</a>
                  <a class="dropdown-item" href="#">Romance</a>
                  <a class="dropdown-item" href="#">Terror</a>
                </div>
              </div>
            </div>
          </div>
          <div class="card-deck text-light ">
            <div class="card shadow">
              <img src="./img/products/lollapalooza.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Lollapalooza 2022</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
            <div class="card shadow">
              <img src="./img/products/primaverasoundsantiago.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Primavera sound Santiago</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
            <div class="card shadow">
              <img src="./img/products/vangogh.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Meet Vicent Van Gogh</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              </div>
            </div>
          </div>
      </div>



            <!-- Modal -->
        <div class="modal fade" id="modalIniciarSesion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Iniciar sesión</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Correo electrónico</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                          <small id="emailHelp" class="form-text text-muted"></small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Contraseña</label>
                          <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1">
                          <label class="form-check-label" for="exampleCheck1">Recuerdame</label>
                        </div>
                      </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">Enviar</button>
                </div>
            </div>
            </div>
        </div>

                    <!-- Modal -->
        <div class="modal fade" id="modalRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Registro</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre</label>
                            <input type="text" class="form-control" id="exampleName">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Correo electrónico</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                          <small id="emailHelp" class="form-text text-muted"></small>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Contraseña</label>
                          <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Confirmar contraseña</label>
                            <input type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                      </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">Enviar</button>
                </div>
            </div>
            </div>
        </div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
  </body>
</html>
`;