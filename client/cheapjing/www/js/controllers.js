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

                    console.log(marker);

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

.controller('whitelistItemCtrl', function($scope, $rootScope, $state) {
    
    $scope.card = {};
    $scope.card.isWhitelistDetails = true;
})

.controller('signupCtrl', function($scope, $rootScope, $state, Member, Loading, $ionicLoading, $ionicHistory, $ionicPopup){
    
    $scope.select = {};
    $scope.select.user_type_choice = [
        {'id': 0, 'label': 'Buyer', 'value': 'Buyer'},
        {'id': 1, 'label': 'Shopper', 'value': 'Shopper'}
    ];
    
    $scope.temp = {};
    $scope.temp.user_type_choice_input = null;
    
    $scope.input = {};
    $scope.input.name = 'CY Kwong';
    $scope.input.password = 'alpha5au';
    $scope.input.confirm_password = 'alpha5au';
    $scope.input.address = 'Mei Foo, Hong Kong';
    $scope.input.email = 'cykwongaa@connect.ust.hk';
    $scope.temp.user_type_choice_input = $scope.select.user_type_choice[0];
    
    $scope.signup = function() {
        $scope.input.userType = $scope.temp.user_type_choice_input.value;
        Loading.show($ionicLoading);
        Member.create($scope.input, function(response){
            Loading.hide($ionicLoading);
            $ionicPopup.alert({
                title: '<i class="icon icon-fa-info-circle"></i> Signup Status',
                template: 'Signup Successfully!',
                okText: 'OK'
            }).then(function(response){
                $state.go('login');
                $ionicHistory.clearHistory();
            });
        }, function(e) {
			alert(JSON.stringify(e));
		});
    }
    
})

.controller('AppCtrl', function($scope, $rootScope, $state, Member, $ionicPopup, Loading, $ionicLoading) {

	$scope.wishes = [];
	$scope.global_items = [];
    
    $rootScope.user_type = null;

	$rootScope.user = {};

	$scope.getUser = getUser;

    $scope.login = login;
    $scope.logout = logout;

    $scope.input = {};
    $scope.input.email = null;
    $scope.input.password = null;
    
    $rootScope.system = {};
    $rootScope.system.version = 'v 0.9 beta';
    
    $rootScope.internetPopupLock = false;

    $scope.toSignup = function() {
        $state.go('signup');
    }

    function login() {
		$scope.getUser();
	};
    
    function logout() {
        $rootScope.user = {};
        $state.go('login');
    };
    
	function getUser() {
        //if(!$rootScope.isInternetConnected()){
            //$rootScope.alertInternetDisconnected();
        //};
        //$state.go('shoppertab.home');
        
        //$scope.input = $scope.input.where;
        //console.log($scope.input);
        
        if($scope.input.email == 'josietam@howzt.com' && $scope.input.password == '1234'){
            $rootScope.user_type = 'shopper';
            $state.go('shoppertab.home');
        }
        else if($scope.input.email == 'twongao@gmail.com' && $scope.input.password == '1234'){
            $rootScope.user_type = 'buyer';
            $state.go('shoppertab.home');
        }
        else{
            $ionicPopup.alert({
                title: '<i class="icon icon-fa-info-circle"></i> Login Status',
                template: 'Username or Password incorrect.',
                okText: 'OK'
            });
        }
        
//        console.log($scope.input.where);
/*        
        Loading.show($ionicLoading);
		Member.findOne($scope.input, function(user) {
            Loading.hide($ionicLoading);
			console.log("user: ", user);
            $rootScope.user = user;
            //alert(user.userType);
//            $scope.input.where.email = null;
//            $scope.input.where.password = null;
            
            if(user.userType == 'buyer'){
                $state.go('buyertab.home');
            }
            else if(user.userType == 'shopper'){
                $state.go('shoppertab.home');
            }
		}, function(e) {
			//alert(JSON.stringify(e));
            $ionicPopup.alert({
                title: '<i class="icon icon-fa-info-circle"></i> Login Status',
                template: 'Username or Password incorrect.',
                okText: 'OK'
            });
		});
*/
    };

    $rootScope.alertInternetDisconnected = function () {
        if (!$rootScope.internetPopupLock) {
            $rootScope.internetPopupLock = true;
            //alert($rootScope.language);
            $ionicPopup.confirm({
                title: 'Connection Status',
                content: 'Internect Connection Failure',
                cancelText: 'Cancel',
                okText: 'OK'
            }).then(function (response) {
                $rootScope.internetPopupLock = false;
            });
        }
    };
    
})

.controller('HomeCtrl', function($scope, $rootScope, $ionicPopup, $state) {
        
    $scope.init = init;
    
    function init() {
        $scope.initGoogleMap();
    }
    
    $scope.onClickGoogleMap = function() {
        $state.go('google_map');
    }
    
    $scope.popupProfilePicture = function () {
        //alert('$scope.popupProfilePicture()');
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

.controller('WishlistCtrl', function($scope, $ionicPopup, Itemlist ,Wishlist, $state, $rootScope) {
	$scope.items = [];
	$scope.global_items = [];

    $scope.$on("$viewContentLoaded", function(event) {
        jQuery('.item-content').css('background-color', "red");
    });
	
	activate();

	function activate() {
		console.log("hello world");		
		$scope.wishes = Wishlist.all();
		$scope.global_items = Itemlist.all();
	}

    $scope.toWhitelistItem =  function(item) {
        $rootScope.items = item;
        $state.go('whitelist_item');
    }
    
	$scope.onclick_wishes = function (index) {

		console.log("in onclick wishes", index, $scope.wishes[index]);
		for(i in $scope.wishes[index].wish_item_offers){
			$scope.wish_item_offers.push({
				shopper_name: $scope.wishes[index].wish_item_offers[i].shopper_name,
		        item_name: $scope.wishes[index].wish_item_offers[i].item_name,
		        quatity: $scope.wishes[index].wish_item_offers[i].quatity,
		        item_price: $scope.wishes[index].wish_item_offers[i].item_price,
		        location: $scope.wishes[index].wish_item_offers[i].location
			});
		}
		$state.go('buyertab.wishitem', {index: index});
	}

	$scope.onclick_global_itemlist = function (index) {
		console.log("called global_item_list" , $scope.global_items[index]); 
		$scope.wishes.push({
			id: $scope.global_items[index].id,
			item_name: $scope.global_items[index].item_name,
			wish_item_offers: $scope.global_items[index].wish_item
		});
		$scope.global_items.splice(index, 1);

	}

    $scope.addItem = function () {
    	$scope.add_query = ""
    	$scope.global_items.sort(function(a, b){
    		return a.id - b.id;
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
		var item_to_delete = $scope.wishes[idx];
		//Wishes.DeletePerson({ id: person_to_delete.id }, function (success) {
		    $scope.global_items.push({
		    	id: $scope.wishes[idx].id,
		    	item_name: $scope.wishes[idx].item_name
		    });
		    $scope.wishes.splice(idx, 1);
		//});
	};

})
.controller('ShopCtrl', function($scope) {})

.controller('RulesCtrl', function($scope) {})
.controller('InventoryCtrl', function($scope) {

});
