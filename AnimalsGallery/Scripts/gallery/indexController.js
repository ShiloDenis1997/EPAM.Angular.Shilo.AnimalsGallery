angular.module('animals')
    .controller('IndexController',
    [
        '$scope', function ($scope) {
            console.log('hello from indexController');
            $scope.height = $('header').outerHeight(true);
            console.log($scope.height);
            $scope.user = { name: "Denis" };
        }
    ]);