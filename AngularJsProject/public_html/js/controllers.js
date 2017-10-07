'use strict';

/* Controllers */

var helloWorldControllers =  angular.module('helloWorldControllers', []);

helloWorldControllers.controller('MainCtrl',
        ['$scope', '$location', '$http',
        function MainCtrl($scope, $location, $http) {
            $scope.message = "Hello World, White spaces make a difference";
}]);

helloWorldControllers.controller('ShowCtrl',
        ['$scope', '$location', '$http',
            function ShowCtrl($scope, $location, $http) {
                $scope.message = "Show The World";
}]);