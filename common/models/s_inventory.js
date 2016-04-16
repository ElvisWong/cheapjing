var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Inventory) {

	// s_inventory.createInventory = function(data, cb) {
	// 	var ctx = loopback.getCurrentContext();
	// 	var currentUser = ctx && ctx.get('currentUser');
	// 	s_inventory.create(data, function(err, s_inventory) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 	});
	// }

};
