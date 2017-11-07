'use strict';

/* Controllers */

var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('BlogCtrl',['$scope',
    function BlogCtrl($scope) {
        $scope.blogArticle = 
                "This is a blog post about AngularJS.  \n\
                 We will cover how to build a blog and \n\
                 how to add comments to the blog post.";
        
        $scope.blogList = [
            {
                "_id": 1,
                "date": 1400623623107,
                "introText": "This is a blog post about AngularJS. \n\
                              We will cover how to build",
                "blogText": "This is a blog post about AngularJS. \n\
                             We will cover how to build a blog and \n\
                             how to add comments to the blog post."
            },
            {
                "_id": 2,
                "date": 1508127830392,
                "introText": "In this blog post we will learn how to \n\
                              build applications based on REST",
                "blogText": "In this blog post we will learn how to \n\
                             build applications based on REST web \n\
                             services that contain most of the \n\
                             business logic needed for the application."
            }
        ];
        
}]);

blogControllers.controller('ListBlogCtrl', 
    ['$scope', 
    'BlogList',
    function ListBlogCtrl($scope, BlogList) {
        BlogList.get({},
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
                $scope.blogList = response;
            },
            function error(errorResponse) {
                console.log("I got this Error:" + JSON.stringify(errorResponse));
            }
        );
}]);

blogControllers.controller('BlogViewCtrl',
    ['$scope', '$routeParams',
     function BlogViewCtrl($scope, $routeParams){
         var blogId = $routeParams.id;
         var blog1 = { 
             "_id": 1,
             "date": 1400623623107, 
             "introText": "This is a blog post about AngularJS. We \n\
                           will cover how to build",
             "blogText":  "This is a blog post about AngularJS. We \n\
                           will cover how to build a blog and how to \n\
                           addcomments to the blog post.",
             "comments" :[ 
                 {"commentText" : "Very good post. I love it."},
                 {"commentText" : "When can we learn services."}
             ]
        };
        
        var blog2 = {
            "_id": 2,
            "date": 1400267723107,
            "introText": "In this blog post we will learn how to \n\
                          build applications based on REST",
            "blogText":  "In this blog post we will learn how to \n\
                          build applications based on REST web \n\
                          services thatcontain most of the business \n\
                          logic needed for the application.",
             "comments" :[
                 {"commentText" : "REST is great. I want to know more."},
                 {"commentText" : "Will we use Node.js for REST services?."}
             ]
         };
         
         if(blogId === '1'){
             $scope.blogEntry = blog1;
         } else if(blogId === '2') {
             $scope.blogEntry = blog2;
         }
}]);

blogControllers.controller('RestBlogCtrl',
    [   '$scope', 
        'BlogList', 
        function RestBlogCtrl($scope, BlogList){
            $scope.blogList = [];
            BlogList.get({},
                function success(response) {
                    console.log("Success: " + JSON.stringify(response));
                    $scope.blogList = response;
                },
                function error(errorRespnse){
                    console.log("Error:: " + JSON.stringify(errorResponse));
                }
            );
            
}]);

blogControllers.controller('RestBlogViewCtrl',
    [   '$scope', 
        '$routeParams', 
        'BlogPost', 
        function RestBlogViewCtrl($scope, $routeParams, BlogPost) {
            var blogId = $routeParams.id;
            $scope.blg = 1;
            BlogPost.get({id: blogId},
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    $scope.blogEntry = response;
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
            );
}]);