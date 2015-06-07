var User = require('./models/User');
var calendar = require('./models/Calendar');
var qs = require('querystring');

function getUsers(res){
	User.getAll(function(err, users) {
		console.log('getUsers() ');
			if (err) {
				res.send(err);
				console.log('getUsers() err= ' + err);
			}
			console.log('getUsers() users= ' + users);
			res.json(users);
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.get('/api/getAllUser', function(req, res) {

		User.getAll(function(err, users){
			if (err)
				res.send(err);

			res.json(users);
		});
	});

	app.get('/api/findUser', function(req, res) {
	
    	var id = req.body.user_id || req.params.user_id;
		User.findById(id, function(err, user){
			if (err)
				res.send(err);

			res.json(user);
		});
	});

	
	app.post('/api/createUser', function(req, res) {
		var user_name = req.body.user_name || req.params.user_name;
		var user_password = req.body.password || req.params.password;
		if (user_name == undefined || user_password == undefined) {
			res.writeHead(500);
			res.send('user name or password cannot be null')
		} else {
			var newUser = new User({name:user_name, password:user_password})
			newUser.save(function(err, user) {
			if (err) 
				res.send(err);
			
			getUsers(res);
			});
		}

	});

	// delete a User
	app.delete('/api/user/:user_id', function(req, res) {
		var user_id = req.params.user_id;
		User.remove(user_id, function(err, code) {
			if (err)
				res.send(err);

			getUsers(res);
		});
	});

	//date_property
	app.post('/api/date_property', function(req, res) {

		var day = req.body.date || req.params.date;
		if (day == undefined) res.send("day cannot be null");
		console.log('day = ' + day);
		var daytype = JSON.stringify(calendar.bali_calendar(day));
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Length': daytype.length.toString()
		});
		res.end(daytype);

	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};