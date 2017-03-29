angular.module('gallery')
.directive('sdsPagination', ['imageService', function (imageService) {
    function link(scope, element, attrs) {
        
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            currentPage: '=',
            numberOfPages: '=',
            getData: '=',
            pageSize: '='
        },
        templateUrl: '/Views/Directives/sdsPaginationDirective.html'
    }
}]);