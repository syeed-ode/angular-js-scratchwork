

var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('BlogPost', 
    ['$resource',
    function($resource) {
        return $resource("http://localhost:8080/blogs/:id", 
            {}, 
            {
                get:    {method: 'GET', cache: false, isArray: false},
                save:   {method: 'POST', cache: false, isArray: false},
                update: {method: 'PUT', cache: false, isArray: false},
                delete: {method: 'DELETE', cache: false, isArray: false}
            }
        );
}]);

blogServices.factory('BlogList', 
    ['$resource',
    function($resource) {
        return $resource(
            "http://localhost:8080/blogs", 
            {}, 
            {
                get: {method: 'GET', cache: false, isArray: true}
        });
}]);