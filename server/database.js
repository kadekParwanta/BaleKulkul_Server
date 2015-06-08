var pg = require('pg');

var client = new pg.Client(process.env.DATABASE_URL);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, password VARCHAR(40) not null)');
query.on('end', function() { client.end(); });