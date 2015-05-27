'use strict';

var
	http = require('http'),
	express = require('express'),
	crud = require('./lib/crud'),
	employee = require('./lib/employee'),
	makeMongoId = crud.makeMongoId,
	app = express(),
	server = http.createServer(app);


//Routes
app.get('/', function(request,response) {
	response.redirect('/index.html');
});

app.all('/user/*?', function(request,response,next) {
	response.contentType('json');
	next();
});

app.get('/:obj_type/login/:usr/:pswrd', function(request,response) {
	crud.read(
		request.params.obj_type,
		{email: request.params.usr, password:  request.params.pswrd},
		{},
		function(map_list) {
			response.send(map_list);
		}
	);
});

app.get('/:obj_type/list', function(request,response) {
	crud.read(
		request.params.obj_type,
		{}, {},
		function(map_list) {
			response.send(map_list);
		}
	);
});

app.post('/:obj_type/create', function(request,response) {
	crud.construct(
		request.params.obj_type,
		request.body,
		function(result_map) {
			response.send(result_map);
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

app.post('/:obj_type/update/:id', function(request,response) {
	crude.update(
		request.params.obj_type,
		{_id: makeMongoId(request.params.id)},
		request.body,
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


app.configure( function () {
	app.use( express.logger() );
	app.use( express.bodyParser() );
	app.use( express.methodOverride() );
	app.use( express.static( __dirname + '/public' ) );
	app.use( app.router );
});

server.listen(3000);