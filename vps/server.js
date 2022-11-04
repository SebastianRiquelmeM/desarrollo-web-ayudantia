import express from "express";
import { engine } from "express-handlebars"; // "express-handlebars"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

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

//Para leer desde form HTML
app.use(bodyParser.urlencoded({ extended: false }));

//Renderiza login.handlebars en la ruta principal
app.get("/", (req, res) => {
	res.render("login");
});

//Renderiza register.handlebars en la ruta /register
app.get("/register", (req, res) => {
	res.render("register");
});

//Ruta de ejemplo para una query a la database
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

//Ruta que recibe los datos del formulario html que está en login.handlebars
//Se comunica con la daatabase para verificar usuario y contraseña
app.post("/API/login", async (req, res) => {
	console.log(req.body);
	let user = req.body.user;
	let pass = req.body.pass;

	if (user != "" && pass != "") {
		//res.send("entró");

		try {
			const database = client.db("datos_db");
			const colection_usuarios = database.collection("usuarios");
			const query = { usuario: user };
			const usuario = await colection_usuarios.findOne(query);

			if (usuario) {
				// Si existe el usuario, comparamos la contraseña
				// En la realidad, las contraseñas se manejan hasheadas...
				// Pero aqui es a modo de ejemplo
				if (usuario.password == pass) {
					console.log("Login exitoso para el usuario ", user, "!");
					res.render("ticketera", { usuario: user });
				} else {
					res.render("login", {
						fallido: "Usuario o contraseña incorrectos.",
					});
				}
			} else {
				res.render("login", {
					fallido: "Usuario o contraseña incorrectos.	",
				});
			}
		} finally {
			//Esto lanzaba un error cuando habian credenciales incorrectas más de 1 vez
			// Ensures that the client will close when you finish/error
			//await client.close();
		}
	} else {
		res.render("login", {
			fallido: "Usuario o contraseña vacíos.",
		});
	}
});

app.post("/API/register", async (req, res) => {
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

			if (usuario) {
				res.render("register", {
					fallido: "El usuario ya está registrado.",
				});
			} else {
				try {
					const database = client.db("datos_db");
					const haiku = database.collection("usuarios");
					// create a document to insert
					const doc = req.body;

					const result = await haiku.insertOne(doc);
					console.log(
						`El documento de usuario ha sido insertado con el _id: ${result.insertedId}`
					);
					res.render("login", {
						fallido:
							"Se ha registrado con éxito! Inicie sesión para continuar",
					});
				} finally {
					await client.close();
				}
			}
		} finally {
			// Ensures that the client will close when you finish/error
			await client.close();
		}
	} else {
		res.render("register", {
			fallido: "No pueden haber datos vacíos.",
		});
	}
});

/*
app.get("/ticketera", (req, res) => {
	res.render("ticketera");
});
*/
app.listen(3000, () => {
	console.log("Server express-handlebars corriendo en puerto: 3000");
});
