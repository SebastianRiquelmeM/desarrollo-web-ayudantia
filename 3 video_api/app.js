import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

//=======DATABASE================
const uri =
	"mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

const client = new MongoClient(uri);
const database = client.db("datos_db");

//===============================

const SECRET_JWT_KEY = "lamejorcontraseña";
const app = express();

app.use(express.json());

//Para leer desde form HTML
app.use(bodyParser.urlencoded({ extended: false }));

//Renderiza login.handlebars en la ruta principal
app.get("/API/", (req, res) => {
	res.json({
		message: "Bienvenido a la API del proyecto de desarrollo web!",
	});
});

//Ruta de ejemplo para una query a la database
app.get("/API/eventos", async (req, res) => {
	try {
		const collection = database.collection("eventos");
		collection.find({}).toArray(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Query exitosa a la db, eventos enviados");
				res.json({
					eventos: result,
				});
				return;
			}
		});

		//res.send(usuario);
	} finally {
		// Ensures that the client will close when you finish/error
		//await client.close();
		console.log("Error en la query");
	}
});

function loginByToken(req) {
	const token = req.headers.authorization;
	if (!token) return null;
	const decoded = jwt.verify(token, SECRET_JWT_KEY);
	return decoded;
}

app.post("/API/login", (req, res) => {
	if (loginByToken(req)) {
		res.status(200).json({
			message: "Login con token exitoso!",
		});
		return;
	}
	//Ejemplo de token para Frez
	// https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiRnJleiIsIm5hbWUiOiJtaW5lY3JhZnQifQ.NfI48yK1xd3LAQJz07tDRSIjmdFX3v4_UZPbM9Ys9Io

	//Recibe datos desde el cliente
	const request = JSON.parse(JSON.stringify(req.body));

	//verifico que request.user y request.password no esten vacios
	if (request.user && request.password) {
		const user = request.user;
		const password = request.password;

		//consulto a la db si existe el usuario
		const collection = database.collection("usuarios");
		collection.find({ usuario: user }).toArray(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				//si existe el usuario, verifico que la password sea correcta
				if (result[0].password == password) {
					//creo el token
					const token = jwt.sign(
						{ user: user, id: result[0]._id },
						SECRET_JWT_KEY,
						{ expiresIn: "1h" }
					);
					res.status(200).json({
						token: token,
					});
					return;
				} else {
					res.json({
						message: "Contraseña incorrecta",
					});
					return;
				}
			}
		});
	} else {
		res.status(400).json({
			message: "Datos incompletos",
		});
		return;
	}
});

//Recibe un id de usuarioy retorna los datos del usuario
app.post("/API/user/:id", (req, res) => {
	if (!loginByToken(req)) {
		res.status(401).json({
			message: "Token invalido",
		});
		return;
	}
	const id = req.params.id;
	const collection = database.collection("usuarios");
	collection.find({ _id: ObjectID(id) }).toArray(function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.json({
				usuario: result[0],
			});
			return;
		}
	});
});

app.listen(3000, () => {
	console.log("Server express corriendo en puerto: 3000");
});
