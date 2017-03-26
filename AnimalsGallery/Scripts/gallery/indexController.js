angular.module('gallery')
    .controller('IndexController',
    [
        '$scope',
        function ($scope) {
            console.log('hello from indexController');
            $scope.height = $('header').outerHeight(true);
            console.log($scope.height);
        }
    ]);