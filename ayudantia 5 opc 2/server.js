import express from "express";
import { engine } from 'express-handlebars'; // "express-handlebars"

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("__dirname: ", __dirname);

const app = express();

app.engine("handlebars", engine());


app.set("view engine", "handlebars");

//Indico donde estan mis views
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (req, res) => {
	res.render("home");
});


app.listen(3000, () => {
	console.log("express-handlebars example server listening on: 3000");
});
