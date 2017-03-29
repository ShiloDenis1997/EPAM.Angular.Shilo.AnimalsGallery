angular.module('gallery')
    .directive('sdsImagePreviewControls',
        function (imageService, Session) {
            function link(scope, element, attrs) {
                console.log('hello from directive');

                scope.albumNames = imageService.getAlbumNames();
                scope.albums = imageService.getAlbums();
                scope.selectedAlbum = '';
                scope.isShowed = false;
                console.log('albumNames');
                console.log(scope.albumNames);
                console.log('albums');
                console.log(scope.albums);

                scope.selectAlbum = function(name) {
                    scope.albumName = name;
                }

                scope.albumMatch = function (criteria) {
                    return function (albumName) {
                        if (albumName === 'all')
                            return false;
                        if (scope.albums[albumName] === undefined)
                            return false;
                        if (scope.albums[albumName].userId !== +Session.userId)
                            return false;
                        return true;
                    }
                }

                scope.getImageContainerClass = function() {
                    return "landscape col-xs-8";
                }

                scope.getImageStyle = function() {
                    return { height: "300px", 'margin-bottom': 0 };
                }
            }
            return {
                restrict: 'E',
                scope: {
                    imageName: '=',
                    albumName: '=',
                    imageLink: '='
                },
                templateUrl: 'Views/Directives/sdsImagePreviewControls.html',
                link: link
            }
        });