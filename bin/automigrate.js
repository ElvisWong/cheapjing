var path = require('path');

var app = require(path.resolve(__dirname, '../server/server.js'));
var ds = app.datasources.cheapjingDS;
ds.automigrate('Authenticate', function(err) {
	if (err) throw err;

	var users = [
		{
			email: 'abc@abc.com',
			password: '123456',
			oAuthAgent: 'ajdflk3rjlr',
			userType: "shopper",
			createdAt: new Date(),
			lastLogin: new Date()
		}
	];
	var count = user.length;
	users.foreach(function(user) {
		app.models.Authenticate.create(user, function(err, model) {
			if (err) throw err;
			console.log('Created: '. model);
			count--;
			if (count===0)
				ds.disconnect();
		});
	});
});