import express from "express";
import { engine } from 'express-handlebars'; // "express-handlebars"
//const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";	

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// La URI la obtenemos con el comando "mongosh" en terminal

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0"

// Iniciamos el cliente 
const client = new MongoClient(uri);

const app = express();

app.engine("handlebars", engine());

//Indico engine de mis views
app.set("view engine", "handlebars");

//Indico donde estan mis views
app.set("views", path.resolve(__dirname, "./views"));

// serve all other static files like CSS, images, etc
app.use(express.static(`${__dirname}/views`));

app.get("/usuarios", async (req, res) => {
	try {
		const database = client.db('datos_db');
		const movies = database.collection('usuarios');
		// Query for a movie that has the title 'Back to the Future'
		const query = { usuario: 'Seba' };
		const usuario = await movies.findOne(query);
		console.log(usuario);
		res.send(usuario);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
});

app.get("/", (req, res) => {
	res.render("login");
});

const credenciales = {
	user: "Frez",
	password: "minecraft"
}

app.get('/login', (req, res) => {
	let user = req.query.user
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
	}
	//console.log(req.query.user)
});


app.listen(3000, () => {
	console.log("Server express-handlebars corriendo en puerto: 3000");
});
