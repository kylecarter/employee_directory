'use strict';

var
	http = require('http'),
	express = require('express'),
	crud = require('./lib/crud'),
	employee = require('./lib/employee'),
	makeMongoId = crud.makeMongoId,
	app = express(),
	bodyParser = require('body-parser'),
	server = http.createServer(app);


app.configure( function () {
	app.use( express.logger() );
	app.use( express.bodyParser() );
	app.use(bodyParser.urlencoded({ extended: true})); 
	app.use( express.methodOverride() );
	app.use( express.static( __dirname + '/public' ) );
	app.use( app.router );
});

//Routes
app.get('/', function(request,response) {
	response.redirect('/index.html');
});

app.all('/user/*?', function(request,response,next) {
	response.contentType('json');
	next();
});

app.post('/:obj_type/login', function(request,response) {
	crud.read(
		request.params.obj_type,
		{email: request.query.usr, password:  request.query.pswrd},
		{},
		function(map_list) {
			response.send(map_list);
		}
	);
});


app.post('/:obj_type/create', function(request,response) {
	console.log(request.query)
	crud.construct(
		request.params.obj_type,
		request.query,
		function(result_map) {
			response.send(result_map);
		}
	);
});

app.get('/:obj_type/read', function(request,response) {
	crud.read(
		request.params.obj_type,
		{}, {},
		function(map_list) {
			response.send(map_list);
		}
	);
});

app.get('/:obj_type/read/:id', function(request,response) {
	crud.read(
		request.params.obj_type,
		{employee_id: request.params.id},
		{},
		function(map_list) {
			response.send(map_list);
		}
	);
});

app.get('/:obj_type/dbread/:id', function(request,response) {
	crud.read(
		request.params.obj_type,
		{_id: makeMongoId(request.params.id)},
		{},
		function(map_list) {
			response.send(map_list);
		}
	);
});

app.post('/:obj_type/updatepw/:id', function(request,response) {
	crud.update(
		request.params.obj_type,
		{_id: makeMongoId(request.params.id)},
		{password:  request.query.pswrd},
		function(result_map) {
			response.send(result_map);
		}
	);
});

app.post('/:obj_type/avatar/:id', function(request,response) {
	crud.update(
		request.params.obj_type,
		{_id: makeMongoId(request.params.id)},
		{avatar:  request.query.graphic},
		function(result_map) {
			response.send(result_map);
		}
	);
});

app.get('/:obj_type/delete/:id', function(request,response) {
	crud.destroy(
		request.params.obj_type,
		{_id: makeMongoId(request.params.id)},
		function(result_map) {
			response.send(result_map);
		}
	);
});


server.listen(3000);