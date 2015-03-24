var express=require("express");
var bodyParser = require('body-parser');
var app=express();
var persona1 = {nombre:"Pepe", apellidos:"Pérez", edad:30};
var persona2 = {nombre:"Ana", apellidos:"García", edad:21};
var persona3 = {nombre:"Mark", apellidos:"López", edad:40};
var persona4 = {nombre:"Iñigo", apellidos:"Aranda", edad:17};
var persona5 = {nombre:"Eva", apellidos:"Garcés", edad:33};

var listaPersonas = [];
var _=require("underscore");

listaPersonas.push(persona1);
listaPersonas.push(persona2);
listaPersonas.push(persona3);
listaPersonas.push(persona4);
listaPersonas.push(persona5);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/personas", function (req,res){
	res.send(listaPersonas);
});

app.post("/personas", function(req,res){
	listaPersonas.push(req.body);	
	res.send(req.body);
});

app.delete("/personas/nombre/:nombre", function(req,res){
	listaPersonas=_.filter(listaPersonas, function(persona){
		return persona.nombre != req.params.nombre;
	});
	res.send(req.params.nombre);
	//console.log(listaPersonas);
});

app.use("/",express.static(__dirname+"/ejercicios",'public'));
var servidor= app.listen(3000,function() {
	console.log(listaPersonas);
	console.log("servidor arrancado");
});
