angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {

})
.controller('LoginCtrl', function($scope, $state) {

    $scope.onClickLogin = function(){
        $state.go('shoppertab');
    }


})
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
		Authenticate.findOne(JSON.stringify({id:1}), function(user) {
			console.log("user: ", user);
		}, function(e) {
			console.log(e);
		});
	};

})
.controller('WishlistCtrl', function($scope, $ionicPopup, Wishlist) {

	$scope.items = [];
	$scope.global_items = [];
	activate();

	function activate() {
		console.log("hello world");		
		$scope.items = Wishlist.all();
	}



    $scope.addItem = function () {

		$scope.items.item_id = "";
		$scope.items.item_name = "";

	    var myPopup = $ionicPopup.show({
	    template: '<input ng-model="items.item_id" placeholder="Item ID"></br><input ng-model="items.item_name" placeholder="Item Name">',
	    title: 'Add Item to your Wish List',
	    subTitle: 'Please input item id and name',

	    scope: $scope,
	    buttons: [
	      { text: 'Cancel' },
	      {
	        text: '<b >Save</b>',
	        type: 'button-positive',
	        onTap: function(e) {
	          
			        $scope.items.push({
			            id: $scope.items.item_id,
			    		item_name: $scope.items.item_name
			        });

	          
	        }
	      }
	    ]
	  	});
       
    };

    $scope.removeItem = function ( idx ) {
		var item_to_delete = $scope.items[idx];
		//Wishes.DeletePerson({ id: person_to_delete.id }, function (success) {
		    $scope.items.splice(idx, 1);
		//});
	};

})
.controller('ShopCtrl', function($scope) {

	$scope.purchase = function () {

		Inventory.reduce({}, function(Inventory) {
			$scope.items = inventory;
		}, function(err) {
			console.log(err)
		});

	}

})

.controller('RulesCtrl', function($scope) {})
.controller('InventoryCtrl', function($scope) {

	$scope.items = [];

	function activate() {
		Inventory.all({}, function(Inventory) {
			$scope.items = inventory;
		}, function(err) {
			console.log(err)
		});
	}

    $scope.addItem = function () {

        $scope.items.push({
            id: $scope.item_id,
            shopper_id: $scope.shopper_id,
            vol: $scope.vol,
            std_price: $scope.std_price
        });

       
    };

    $scope.removeItem = function ( idx ) {
		var item_to_delete = $scope.items[idx];
		//Inventory.DeletePerson({ id: person_to_delete.id }, function (success) {
		    $scope.items.splice(idx, 1);
		//});
	};


});
