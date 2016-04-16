// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'ngCordova','starter.controllers', 'ngResource', 'lbServices', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $state, $location) {
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
      
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //   if ( toState.data.auth === 'requireLogin' ) {
    //       console.log("go back login!");
    //      $location.url('/login');
    //  }
    // });
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
        templateUrl: "templates/login.html",
        controller: 'AppCtrl',
        data: {auth: ''}
    })
  
    .state('menu', {
      url: '/menu',
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
  
    .state('google_map', {
      url: '/google_map',
      templateUrl: 'templates/google_map.html',
      controller: 'googlemapCtrl'
    })
  
    .state('buyertab', {
      url: '/buyertab',
      abstract: true,
      templateUrl: 'templates/buyertabs.html',
      data: {auth: 'requireLogin'}
    })
  
    .state('shoppertab', {
      url: '/shoppertab',
      abstract: true,
      templateUrl: 'templates/shoppertabs.html',
      data: {auth: 'requireLogin'}
    })  

    // Each tab has its own nav history stack:

    .state('buyertab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })  
    .state('buyertab.wishlist', {
        url: '/wishlist',
        views: {
          'tab-wishlist': {
            templateUrl: 'templates/tab-wishlist.html',
            controller: 'WishlistCtrl'
          }
        }
      })

    .state('buyertab.wishitem', {
        url: '/wishlist/:index',
        views: {
          'tab-wishitem': {
            templateUrl: 'templates/tab-wishitem.html',
            controller: 'WishitemCtrl'
          }
        }
      })

    .state('buyertab.shop', {
        url: '/shop',
        views: {
          'tab-shop': {
            templateUrl: 'templates/tab-shop.html',
            controller: 'ShopCtrl'
          }
        }
      })
  
      .state('shoppertab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })  

      .state('shoppertab.rules', {
        url: '/rules',
        views: {
          'tab-rules': {
            templateUrl: 'templates/tab-rules.html',
            controller: 'RulesCtrl'
          }
        }
      })
  
      .state('shoppertab.inventory', {
        url: '/inventory',
        views: {
          'tab-inventory': {
            templateUrl: 'templates/tab-inventory.html',
            controller: 'InventoryCtrl'
          }
        }
      })

      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})


.config(function(LoopBackResourceProvider) {
 
    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
 
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://52.221.250.141:3000/api/');

});
