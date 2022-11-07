import express from "express";
import { engine } from "express-handlebars"; // "express-handlebars"
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

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

app.use(cookieParser());

//Renderiza login.handlebars en la ruta principal
app.get("/", (req, res) => {
	res.render("login");
});

//Renderiza register.handlebars en la ruta /register
app.get("/register", (req, res) => {
	res.render("register");
});

app.get("/lists", (req, res) => {
	const data = [
		{
			_id: "636841694db786284b93cdfd",
			nombre: "Llollapalooza 2023",
			imagen: "./img/products/lollapalooza.jpg",
			descripcion: "",
			fechas: ["2023-03-17", "2023-03-18", "2023-03-19"],
			precio: 120000,
			ubicacion: "Parque bicentenario Cerrillos",
			hora_inicio: "11:00",
			hora_termino: "",
		},
		{
			_id: "636844324db786284b93cdff",
			nombre: "Primavera Sound",
			imagen: "./img/products/primaverasoundsantiago.jpg",
			descripcion: "",
			fechas: ["2022-11-07", "2022-11-08", "2022-11-09"],
			precio: 90000,
			ubicacion: "Parque bicentenario Cerrillos",
			hora_inicio: "11:00",
			hora_termino: "21:00",
		},
		{
			_id: "636848f14db786284b93ce05",
			nombre: "Meet Vincent Van Gogh",
			imagen: "./img/products/vangogh.jpg",
			descripcion: "",
			fechas: ["2023-06-17", "2023-06-18", "2023-06-19"],
			precio: 24000,
			ubicacion: "Parque bicentenario Vitacura",
			hora_inicio: "10:00",
			hora_termino: "16:00",
		},
	];
	//console.log(data);
	res.render("lists", { lista: data });
});

app.get("/ticketera", async (req, res) => {
	//Consultamos datos a la db
	if (req.cookies.session) {
		try {
			const database = client.db("datos_db");
			const collection = database.collection("eventos");
			//const query = "";
			//const eventos = await collection.find({});
			//console.log(eventos.toArray());

			collection.find({}).toArray(function (err, result) {
				if (err) {
					console.log(err);
				} else {
					//console.log(JSON.stringify(result));
					console.log("Query exitosa a la db");
					//let datos = JSON.stringify(result);
					//console.log("result: ", result);
					//console.log("JSON.parse(result): ", JSON.parse(result));
					/* 					console.log(
						"JSON.parse(JSON.stringify(result)): ",
						JSON.parse(JSON.stringify(result))
					); */
					//let datos = JSON.parse(result);
					//console.log(datos);
					res.render("ticketera", {
						usuario: req.cookies.session,
						eventos: result,
					});
				}
			});

			//res.send(usuario);
		} finally {
			// Ensures that the client will close when you finish/error
			//await client.close();
		}
	} else {
		res.redirect("/login");
	}
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
		//await client.close();
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
					//res.render("ticketera", { usuario: user });
					res.cookie("session", user);
					res.redirect("/ticketera");
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
