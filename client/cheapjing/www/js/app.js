// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $state.go('login');      
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  // setup an abstract state for the tabs directive

    .state('login', {
        url: "/login",
        views: {
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
        }
    })
  
    .state('buyertab', {
    url: '/buyertab',
    abstract: true,
    templateUrl: 'templates/buyertabs.html'
  })
  
    .state('shoppertab', {
    url: '/shoppertab',
    abstract: true,
    templateUrl: 'templates/shoppertabs.html'
  })  

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })  
  
  .state('tab.shop', {
    url: '/shop',
    views: {
      'tab-shop': {
        templateUrl: 'templates/tab-shop.html',
        controller: 'ShopCtrl'
      }
    }
  })

  .state('tab.wishlist', {
      url: '/wishlist',
      views: {
        'tab-wishlist': {
          templateUrl: 'templates/tab-wishlist.html',
          controller: 'WishlistCtrl'
        }
      }
    })
    .state('tab.rules', {
      url: '/rules',
      views: {
        'tab-rules': {
          templateUrl: 'templates/tab-rules.html',
          controller: 'RulesCtrl'
        }
      }
    })

  .state('tab.inventory', {
    url: '/inventory',
    views: {
      'tab-investory': {
        templateUrl: 'templates/tab-inventory.html',
        controller: 'InventoryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})


// .config(function(LoopBackResourceProvider) {
 
//     // Use a custom auth header instead of the default 'Authorization'
//     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
 
//     // Change the URL where to access the LoopBack REST API server
//     LoopBackResourceProvider.setUrlBase('localhost:3000/api/');
//   });;
