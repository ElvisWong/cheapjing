var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback = require('loopback');

module.exports = function(Member) {

	
	Member.afterRemote('login', function(context, obj, next){
		console.log("Login: ", obj);
		next();
	});

	Member.afterRemote('logout', function(context, obj, next){
		console.log("Logout");
		next();
	});


	Member.getMember = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	if (currentUser != null){
    		console.log(currentUser);
    		cb(null, currentUser);
    	} else{
    		var errMsg = "Fail to get current user";
    		console.log(errMsg);
    		cb(null, errMsg);
    	}
	}

	Member.editMember = function(data, cb){
		var ctx = loopback.getCurrentContext();
		// var accessToken = ctx.get('accessToken');
		// console.log(accessToken);
    	var currentUser = ctx && ctx.get('currentUser');
    	// console.log(currentUser);

    	if (currentUser != null){
    		Member.findById(currentUser.id, function(err, mem){
    			if (err){
    				console.log(err);
    				cb(err, null);
    			} else{
	    			mem.updateAttributes(data, function(err, mem){
	    				if (err){
		    				console.log(err);
		    				cb(err, null);
		    			} else{
		    				console.log("Edit Member: ", mem);
		    				cb(null, mem);
		    			}
	    			});
	    		}
    		});
    	} else{
    		var errMsg = "Fail to get current user";
    		console.log(errMsg);
    		cb(null, errMsg);
    	}
	}

	Member.remoteMethod('getMember', {
		http: {path: '/getMember', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'member', type: 'object'}
	});

	Member.remoteMethod('editMember', {
		http: {path: '/editMember', verb: 'post'},
		accepts: {arg: 'data', type: 'object', http:{source:'body'}},
		returns: {arg: 'member', type: 'object'}
	});

};
