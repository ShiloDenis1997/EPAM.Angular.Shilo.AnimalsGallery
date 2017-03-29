angular.module('gallery')
    .directive('sdsImagePreview',
        function () {
            function link(scope, element, attrs) {
                //console.log('hello from preview directive');
                scope.isShowed = false;

                scope.imageError = function () {
                    //console.log('error');
                    scope.isShowed = false;
                }

                scope.imageLoaded = function () {
                    //console.log('loaded');
                    scope.isShowed = true;
                }
            }
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    imageName: '=',
                    imageLink: '=',
                    imageDate: '=',
                    imageId: '=',
                    onImageClick: '=',
                    getImageStyle: '=',
                    getImageContainerClass: '='
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
              //console.log(attrs);
              //console.log(fn);
              elem.on('load', function (event) {
                  //console.log('loaded');
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
              //console.log(attrs);
              //console.log(fn);
              elem.on('error', function (event) {
                  scope.$apply(function () {
                      fn(scope, { $event: event });
                  });
              });
          }
      };
  }]);