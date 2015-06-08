var pg = require('pg');
var schemas = require("../schemas.js");  
var _ = require("lodash");

var User = function(data) {
	this.data = this.sanitize(data);
}

User.prototype.get = function (name) {  
    return this.data[name];
}

User.prototype.set = function (name, value) {  
    this.data[name] = value;
}

User.prototype.data = {}

User.findById = function(id, callback) {
	var user;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT * FROM users where id=$1',[id]);
		query.on('row', function(row) {
			user = new User(row);
			console.log(JSON.stringify(row));
		});

		query.on('end', function() {
            client.end();
			callback(null, user);
        });

		// Handle Errors
        if (err) return callback(err);
	});
}

User.prototype.save = function(callback) {
	var self = this;
	this.data = this.sanitize(this.data);
	var name = this.data['name'];
	var password = this.data['password'];

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('INSERT INTO users(name, password) VALUES($1,$2)',[name, password]);
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
		});

		query.on('end', function() {
            client.end();
			callback(null, self);
        });

		// Handle Errors
        if (err) return callback(err);
	});
}

User.remove = function(id, callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('DELETE FROM users Where id=$1',[id]);
		query.on('row', function(row) {
			console.log(JSON.stringify(row));
		});

		query.on('end', function() {
            client.end();
			callback(null, 1);
        });

		// Handle Errors
        if (err) return callback(err);
	});
}

User.getAll = function(callback) {
	var results = [];
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		var query = client.query('SELECT * FROM users');
        query.on('row', function(row) {
        	console.log(JSON.stringify(row));
            results.push(row);
        });

        query.on('end', function() {
            client.end();
			callback(null, results);
        });

		// Handle Errors
        if (err) return callback(err);
	});
}


User.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

module.exports = User;