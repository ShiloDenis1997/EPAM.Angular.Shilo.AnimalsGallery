angular.module('gallery')
    .controller('AboutController',
    [
        '$scope', 'textPartsService', function ($scope, textPartsService) {
            $scope.siteInfo = { name: 'aboutInfo', text: '' };
            textPartsService.getTextPart($scope.siteInfo);
            $scope.edit = false;
            $scope.toggleEdit = function (textPart) {
                $scope.edit = !$scope.edit;
                if (!$scope.edit)
                    textPartsService.setTextPart(textPart);
            }
        }
    ]);