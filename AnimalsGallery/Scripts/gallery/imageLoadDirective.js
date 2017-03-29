angular.module('gallery')
.directive('sdsImageLoad', ['imageService', function (imageService) {
    function link(scope, element, attrs) {
        function toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', scope.imageLink);
            xhr.responseType = 'blob';
            xhr.send();
        }

        scope.imageUpload = function (event) {
            var file = event.target.files[0]; //FileList object
            console.log('event');
            console.log(event);
            var reader = new FileReader();
            reader.onload = scope.imageIsLoaded;
            reader.readAsDataURL(file);

        }

        scope.imageIsLoaded = function (e) {
            var image = {
                image: e.target.result,
                desc: scope.imageName
            };
            console.log(image);
            imageService.addImage(scope.albumName, image);
        }

        scope.getImage = function () {
            toDataUrl(scope.imageLink,
                function (result) {
                    var image = {
                        image: result,
                        desc: scope.imageName,
                    };
                    console.log(image);
                    imageService.addImage(scope.albumName, image);
                },
                function (result) {
                    console.log("cannot load image");
                    console.log(result);
                    alert('Cannot load this image. Try to download it and load from file');
                });
        }
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            imageName: '=',
            imageLink: '=',
            albumName: '='
        },
        templateUrl: '/Views/Directives/sdsImageLoad.html'
    }
}]);