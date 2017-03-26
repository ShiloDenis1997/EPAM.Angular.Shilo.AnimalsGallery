angular.module('gallery')
    .directive('sdsImagePreview',
        function() {
            return {
                restrict: 'E',
                scope: {
                    imageName: '=imageName',
                    albumName: '=',
                    imageLink: '=',
                    imageUpload: '=',
                    addButtonText: '=',
                    fileButtonText: '='

                },
                templateUrl: 'Views/Directives/sdsImagePreview.html'
            }
        });