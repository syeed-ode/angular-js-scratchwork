'use strict'

var blogApp = angular.module('blogApp', [
    'ngRoute',
    'blogControllers'
]);

blogApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider
                .when('/list', {
                    templateUrl: 'partials/main.html',
                    controller: 'ListBlogCtrl'
                }).when('/',{
                    templateUrl: 'partials/main.html',
                    controller: 'BlogCtrl'
                }).when('/blogPost/:id',{
                    templateUrl: 'partials/blogPost.html',
                    controller: 'BlogViewCtrl'
                }).when('/rest',{
                    templateUrl: 'partials/main.html',
                    controller: 'RestBlogCtrl'
                }).when('/blogPostRest/:id', {
                    templateUrl: 'partials/blogPost.html',
                    controller: 'RestBlogViewCtrl'
        });
        
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);