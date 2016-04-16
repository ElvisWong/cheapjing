angular.module('starter.controllers', [])

.controller('googlemapCtrl', function($scope, $rootScope){
    
    $scope.disableTap = function() {
        var container = document.getElementsByClassName('pac-container');
        angular.element(container).attr('data-tap-disabled', 'true');
        var backdrop = document.getElementsByClassName('backdrop');
        angular.element(backdrop).attr('data-tap-disabled', 'true');
        angular.element(container).on("click", function() {
            document.getElementById('pac-input').blur();
        });
    };
    
    $scope.initGoogleMap = function () {
        //alert('$scope.initGoogleMap()');
        var mapOptions = {
            center: { lat: 28.613939, lng: 77.209021 },
            zoom: 16,
            disableDefaultUI: true,// DISABLE MAP TYPE
            scrollwheel: false
        };

        try{
            var geocoder = new google.maps.Geocoder();
            $scope.address = $rootScope.user.address;
            
            var contentString = '<h5><b>' + $rootScope.user.name + '</b><br>' + $scope.address + '</h5><br>';

            geocoder.geocode({'address': $scope.address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var map = new google.maps.Map(document.getElementById('fullmap'), mapOptions);

                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });

                    var input = /** @type {HTMLInputElement} */ (
                        document.getElementById('pac-input'));

                    // Create the autocomplete helper, and associate it with
                    // an HTML text input box.
                    var autocomplete = new google.maps.places.Autocomplete(input);
                    autocomplete.bindTo('bounds', map);

                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 200
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                    infowindow.open(map, marker);

                    // Get the full place details when the user selects a place from the
                    // list of suggestions.
                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        infowindow.close();
                        var place = autocomplete.getPlace();
                        if (!place.geometry) {
                            return;
                        }

                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(17);
                        }

                        // Set the position of the marker using the place ID and location.
                        marker.setPlace( /** @type {!google.maps.Place} */ ({
                            placeId: place.place_id,
                            location: place.geometry.location
                        }));
                        marker.setVisible(true);

                        infowindow.setContent('<h5><b>' + place.name + '</b><br>' +
                            place.formatted_address + '</h5>');
                        infowindow.open(map, marker);
                    });

                } else {
                    //alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        catch(error){
            //alert(error);
        }
    };
})

.controller('AppCtrl', function($scope, $rootScope, $state, Member) {

	$rootScope.user = {};

	$scope.getUser = getUser;
    $scope.login = login;
    $scope.logout = logout;

    $scope.input = {};
    $scope.input.where = {};
    $scope.input.where.email = 'abc@abc.com';
    $scope.input.where.password = '123456';
    
	function login() {
		$scope.getUser();
	};
    
    function logout() {
        $rootScope.user = {};
        $state.go('login');
    }
    
	function getUser() {
        
		Member.findOne(JSON.stringify($scope.input), function(user) {
			console.log("user: ", user);
            $rootScope.user = user;
            //alert(user.userType);
            $scope.input.where.email = null;
            $scope.input.where.password = null;
            
            if(user.userType == 'buyer'){
                $state.go('buyertab.home');
            }
            else if(user.userType == 'shopper'){
                $state.go('shoppertab.home');
            }
		}, function(e) {
			alert(JSON.stringify(e));
		});
	};

})
.controller('HomeCtrl', function($scope, $rootScope, $ionicPopup, $state) {
    
    $scope.card = {};
    $scope.card.isProfileInfo = true;
    $scope.card.isNotification = true;
    
    $scope.init = init;
    $scope.changeProfileInfo = changeProfileInfo;
    $scope.changeNotification = changeNotification;
    
    function init() {
        $scope.initGoogleMap();
    }
    
    function changeNotification() {
        $scope.card.isNotification = !$scope.card.isNotification;
    }
    
    function changeProfileInfo() {
        $scope.card.isProfileInfo = !$scope.card.isProfileInfo;
    }
    
    $scope.onClickGoogleMap = function() {
        $state.go('google_map');
    }
    
    $scope.popupProfilePicture = function () {
        alert('$scope.popupProfilePicture()');
        $template = '<img style="width:100%;" src="img/max.png"><br><b>' + $rootScope.user.name + '</b>'
        $ionicPopup.alert({
            title: '<i class="icon icon-fa-info-circle"></i> ProfilePicture',
            template: $template,
            okText: 'OK'
        });
    };

    $scope.initGoogleMap = function () {
        try{
            var latlng = { lat: 28.613939, lng: 77.209021 };
            var mapOptions = {
                center: latlng,
                zoom: 18,
                disableDefaultUI: true,// DISABLE MAP TYPE
                scrollwheel: false,
                draggable: false
            };

            var geocoder = new google.maps.Geocoder();
            $rootScope.user.address = 'Mei Foo, Hong Kong';
            $scope.address = $rootScope.user.address;
            var contentString = '<h4>' + $scope.address + '</h4>';

            geocoder.geocode({'address': $scope.address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var map = new google.maps.Map(document.getElementById('google_map'), mapOptions);
                    
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 200
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                    infowindow.open(map, marker);
                } else {
                    //alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        catch(error){
            //alert(error);
        }
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
