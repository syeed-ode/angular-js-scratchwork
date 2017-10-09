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
        $scope.message = "Show The World we here homie";
}]);

helloWorldControllers.controller('CustomerCtrl',
    ['$scope',
     function CustomerCtrl($scope) {
        $scope.customerName = "Hakeem's Bean Pies";
        $scope.customerNumber = "423843";
        
        $scope.changeCustomer = function () {
            $scope.customerName = $scope.cName;
            $scope.customerNumber = $scope.cNumber;
        };
}]);

helloWorldControllers.controller('AddCustomerCtrl',
    ['$scope', 
     '$location',
     function($scope, $location) {
         $scope.submit = function() {
             $location.path('/addedCustomer/' 
                     + $scope.cName 
                     + "/" 
                     + $scope.cCity);
         }
     }
]);

helloWorldControllers.controller('AddedCustomerCtrl',
    ['$scope',
     '$routeParams',
     function($scope, $routeParams) {
         $scope.customerName = $routeParams.customer;
         $scope.customerCity = $routeParams.city;
}]);