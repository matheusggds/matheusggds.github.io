require('angular');
require('angular-ui-router');
require('angular-cookies');
require('angular-animate');

var authenticationFactory = require('./login/authentication/authentication.factory.js');
var base64Factory = require('./login/authentication/base64.factory.js');
var cartFactory = require('./cart/cart.factory');
var cartComponent = require('./cart/cart.component');
var cartService = require('./cart/cart.service');
var productsFactory = require('./products/products.factory');
var productsComponent = require('./products/products.component');
var productAddEditComponent = require('./products/add_edit/add_editproducts.component');
var loginComponent = require('./login/login.component');

angular.module('iBuyApp', ['ui.router', 'ngCookies', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('login', {
    url: '/login',
    component: 'loginView'
  })
  .state('products', {
    url: '/',
    component: 'listProductsView'
  })
  .state('products.add', {
    url: '/add',
    component: 'productAddEdit'
  })
  .state('products.edit', {
    url: '/edit/:id',
    component: 'productAddEdit'
  })

    // Utilizando o HTML5 History API
    $locationProvider.html5Mode(true);
    
  })
.factory('Base64', base64Factory)
.factory('AuthenticationService', authenticationFactory)
.factory('ProductFactory', productsFactory)
.factory('CartFactory', cartFactory)
.service('CartService', cartService)
.component('listProductsView', productsComponent)
.component('productAddEdit', productAddEditComponent)
.component('loginView', loginComponent)
.component('cartView', cartComponent)
.run(['$rootScope', '$location', '$cookies', '$http', 'ProductFactory',
  function ($rootScope, $location, $cookies, $http, ProductFactory) {

    $rootScope.globals = $cookies.getObject('globals') || {};

    if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          }

          if(ProductFactory.GetAll().length === 0) {
            ProductFactory.Save({ name: 'a', description: 'desc a', quantity: 0, price: '10.00', showAddToCart: false, addedToCart: false});
            ProductFactory.Save({ name: 'b', description: 'desc b', quantity: 0, price: '20.90', showAddToCart: false, addedToCart: false });
            ProductFactory.Save({ name: 'c', description: 'desc c', quantity: 0, price: '30.00', showAddToCart: false, addedToCart: false });
          }

          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
              $location.path('/login');
            }
          });

          $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
          });

        }])