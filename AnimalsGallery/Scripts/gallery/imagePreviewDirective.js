angular.module('gallery')
    .directive('sdsImagePreview',
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

                scope.imageError = function () {
                    console.log('error');
                    scope.isShowed = false;
                }

                scope.imageLoaded = function () {
                    console.log(scope.albums);
                    console.log('loaded');
                    scope.isShowed = true;
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
            }
            return {
                restrict: 'E',
                scope: {
                    imageName: '=',
                    albumName: '=',
                    imageLink: '='
                },
                templateUrl: 'Views/Directives/sdsImagePreview.html',
                link: link
            }
        });

angular.module('gallery')
  .directive('sdsOnLoad', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function (scope, elem, attrs) {
              var fn = $parse(attrs.sdsOnLoad);
              console.log(attrs);
              console.log(fn);
              elem.on('load', function (event) {
                  console.log('loaded');
                  scope.$apply(function () {
                      fn(scope, { $event: event });
                  });
              });
          }
      };
  }]);

angular.module('gallery')
  .directive('sdsOnError', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function (scope, elem, attrs) {
              var fn = $parse(attrs.sdsOnError);
              console.log(attrs);
              console.log(fn);
              elem.on('error', function (event) {
                  scope.$apply(function () {
                      fn(scope, { $event: event });
                  });
              });
          }
      };
  }]);