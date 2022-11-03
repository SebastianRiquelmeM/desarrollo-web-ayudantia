import express from "express";
import { engine } from "express-handlebars"; // "express-handlebars"
import { MongoClient } from "mongodb";
//const { MongoClient } = require("mongodb");
//import res from "express/lib/response";

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

const client = new MongoClient(uri);

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//console.log("__dirname: ", __dirname);

const app = express();

app.engine("handlebars", engine());

//Indico engine de mis views
app.set("view engine", "handlebars");

//Indico donde estan mis views
app.set("views", path.resolve(__dirname, "./views"));

// serve all other static files like CSS, images, etc
app.use(express.static(`${__dirname}/views`));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/api_get", async (req, res) => {
  try {
    const database = client.db("datos_db");
    const movies = database.collection("usuarios");

    const query = { usuario: "Seba" };
    const usuario = await movies.findOne(query);
    console.log(usuario);

    res.send(usuario);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

const credenciales = {
  user: "Frez",
  password: "minecraft",
};

app.post("/login", (req, res) => {
  console.log(req.body);
  /* 	let user = req.query.user
	let pass = req.query.pass
	if( user != "" && pass != ""){
		//res.send("entró");
		if(user == credenciales.user && pass == credenciales.password){
			res.render('ticketera', {'usuario': user});
		}
		else{
			res.render('login', {'fallido': "Usuario o contraseña incorrectos."});
		}
	}
	else{
		res.send("Usuario o contraseña vacíos");
	} */
  //console.log(req.query.user)
  //res.send("Usuario y contraseña recibidos");
  res.status(200).json({ success: true });
});

app.post("/register", async (req, res) => {
  console.log(req.body);

  const user = req.body.user;
  const password = req.body.password;
  const nombre = req.body.nombre;
  const rango = req.body.rango;

  if (user != "" && password != "" && nombre != "" && rango != "") {
    try {
      const database = client.db("datos_db");
      const movies = database.collection("usuarios");

      const query = { usuario: user };
      const usuario = await movies.findOne(query);
      console.log(usuario);
      console.log(typeof usuario);
      if (usuario) {
        console.log(typeof usuario);
      } else {
        try {
          const database = client.db("datos_db");
          const haiku = database.collection("usuarios");
          // create a document to insert
          const doc = req.body;

          const result = await haiku.insertOne(doc);
          console.log(
            `A document was inserted with the _id: ${result.insertedId}`
          );
        } finally {
          await client.close();
        }
      }
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  res.status(200).json({ success: true });
});

/*
app.get("/ticketera", (req, res) => {
	res.render("ticketera");
});
*/
app.listen(3000, () => {
  console.log("Server express-handlebars corriendo en puerto: 3000");
});
