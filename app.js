'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.map',
  'ui.bootstrap',
  'ngMap',
  'autocomplete',
  'ngAutocomplete',
  'geolocation'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/map'});
}]);
