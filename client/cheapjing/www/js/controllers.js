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
	$scope.add_query = "";

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
.controller('WishlistCtrl', function($scope, $ionicPopup, Wishlist, Itemlist) {

	$scope.items = [];
	$scope.global_items = [];
	
	activate();

	function activate() {
		console.log("hello world");		
		$scope.items = Wishlist.all();
		$scope.global_items = Itemlist.all();
	}


	$scope.onclick_global_itemlist = function (index) {
		$scope.items.push({
			id: $scope.global_items[index].id,
			item_name: $scope.global_items[index].item_name})
		$scope.global_items.splice(index, 1);

	}

    $scope.addItem = function () {
    	$scope.global_items.sort(function(a, b){
    		var id_sort = a.id - b.id
    		if(id_sort == 0){
    			return a.item_name - b.item_name;
    		}
    		return id_sort;
    	});
	    var myPopup = $ionicPopup.show({
	    template: '<input ng-model="add_query" ></br></br>' + 
	    		'<ion-list>                                '+
               '  <ion-item ng-click="onclick_global_itemlist($index)" ng-repeat="item in query_items = ( global_items | filter : {item_name: add_query})"> '+
               '    <h2>{{item.item_name}}</h2><p>Item {{item.id}}</p>                             '+
               '  </ion-item>                             '+
               '</ion-list>                               ',
	    title: 'Add Item to your Wish List',
	    

	    scope: $scope,
	    buttons: [
	      { text: 'Finish' }
	    ]
	  	});
       
    };

    $scope.removeItem = function ( idx ) {
		var item_to_delete = $scope.items[idx];
		//Wishes.DeletePerson({ id: person_to_delete.id }, function (success) {
		    $scope.global_items.push({
		    	id: $scope.items[idx].id,
		    	item_name: $scope.items[idx].item_name
		    });
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
