import express from "express";
import { engine } from 'express-handlebars'; // "express-handlebars"
//import res from "express/lib/response";

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


app.get("/", (req, res) => {
	res.render("login");
});

app.get('/login', (req, res) => {
	let user = req.query.user
	let pass = req.query.pass
	if( user != "" && pass != ""){
		res.send("entró");
	}
	else{
		res.send("Usuario o contraseña vacíos");
	}
	//console.log(req.query.user)
});

app.get('/variable', (req, res) => {
	res.render("variable", {"variable": 9999});
});

app.get('/lista', (req, res) => {

	let arreglo = 
			{
				ayudantes: [
					"Sebastián Riquelme",
					"Nicolás Moncada"
				]
			}


	res.render("lista", {personas: arreglo});
});


app.get('/bucle', (req, res) => {

	let arreglo = {
		"ayudantes": 
			[
				{
					nombres: "Sebastián Ignacio",
					apellidos: "Riquelme Muñoz"
				},
				{
					nombres: "Nicolás",
					apellidos: "Moncada"
				}
			]	
	}

	res.render("bucle", {personas: arreglo});
});

/*
app.get("/ticketera", (req, res) => {
	res.render("ticketera");
});
*/
app.listen(3000, () => {
	console.log("Server express-handlebars corriendo en puerto: 3000");
});
