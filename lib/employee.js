'use strict';

var
	emitEmployeeList, signIn, signOut, employeeObj,
	socket = require('socket.io'),
	crud = require('./crud'),
	makeMongoId = crud.makeMongoId,
	onlineEmployees = {};

emitEmployeeList = function() {
	crud.read(
		'user',
		{is_online: true},
		{},
		function(result_list) {
			io
				.of('/user')
				.emit('listchange', result_list);
		}
	);
}

signIn = function(io,user_map,socket) {
	crud.update(
		'user',
		{'_id': user_map._id},
		{is_online: true},
		function(result_list) {
			emitEmployeeList(io);
			user_map.is_online = true;
			// socket.emit('userupdate',user_map);
		}
	);
	onlineEmployees[user_map._id] = socket;
	socket.user_id = user_map._id;
}

signOut = function(io,user_id) {
	crud.update(
		'user',
		{'_id': user_id},
		{'is_online': false},
		function (result_list) { emitUserList(io); }
	);
	delete onlineEmployees(user_id);
}

employeeObj = {
	connect: function(server) {
		var io = socket.listen(server);
		io 
			.set('blacklist', [])
			.of('/employee')
			.on('connection', function(socket) {
				socket.on('addEmployee', function() {
					crud.read(
						'user',
						{name: user_map.name},
						{},
						function (result_list) {
							var result_map,
								cid = user_map.cid;
							if ( result_list.length > 0 ) {
								result_map = result_list[ 0 ];
								result_map.cid = cid;
								signIn( io, result_map, socket );
							} else {
								user_map.is_online = true;
								crud.construct (
									'user',
									user_map,
									function ( result_list ) {
										result_map = result_list[ 0 ];
										result_map.cid = cid;
										chatterMap[ result_map._id ] = socket;
										socket.user_id = result_map._id;
										// socket.emit( 'userupdate', result_map );
										emitUserList( io );
									}
								);
							}
						}
					);
				});
				socket.on('userLogout', function() {
					signOut(io,socket.user_id);
				});
				socket.on('disconnect', function() {
					signOut(io,socket.user_id);
				});
			});
		return io;
	}
};

module.exports = employeeObj;