/* Jasmine specs for controllers go here */

describe('Hello World', function() {
    beforeEach(module('helloWorldApp'));
    
    describe('MainCtrl', function(){
        var scope, ctrl;
        
        beforeEach(inject(function($rootScope, $controller) { 
            scope = $rootScope.$new();
            ctrl = $controller('MainCtrl', {$scope: scope});
        }));
        
        it('should create initialed message', function(){
            expect(scope.message)
                    .toEqual("Hello World, White spaces make a difference");
        });
    });
});