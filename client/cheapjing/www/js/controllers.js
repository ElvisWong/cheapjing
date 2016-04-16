angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope) {})
.controller('HomeCtrl', function($scope, Authenticate) {

	$scope.user = { };

	$scope.activate = activate;
	$scope.getUser = getUser;

	activate();

	function activate() {
		console.log("hello world");
		$scope.getUser();
	};
	function getUser(username) {
		Authenticate.findOne({}, function(user) {
			console.log("user: ", user);
		}, function(e) {
			console.log(e);
		});
	};

})
.controller('WishlistCtrl', function($scope) {})
.controller('ShopCtrl', function($scope) {})
.controller('RulesCtrl', function($scope) {})
.controller('InventoryCtrl', function($scope) {})
;
