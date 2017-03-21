angular.module('animals')
    .controller('AboutController',
    [
        '$scope', function ($scope) {
            $scope.information = [
                { text: "first enot", edit: false },
                { text: "second enot", edit: false },
                { text: "third enot", edit: false }
            ];

            $scope.toggleEdit = function (info) {
                info.edit = !info.edit;
            }
        }
    ]);