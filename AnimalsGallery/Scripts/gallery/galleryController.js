angular.module('animals').controller('GalleryController',
['$scope', 'imageService', function ($scope, imageService) {
    console.log("hello from carousel1");
    $scope.albumName = "pandas";
    $scope.animalLink = "http://kids.nationalgeographic.com/content/dam/kids/photos/games/screen-shots/More%20Games/A-G/babyanimal_open.jpg";
    $scope.animalName = "Panda";

    console.log($scope.albumName);
    $scope.album = imageService.getAlbums();
    console.log($scope.album);
    $scope.images = imageService.getImages($scope.albumName);
    $scope.id = 0;

    function toDataUrl(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    }

    $scope.getImage = function () {
        console.log($scope.id);
        toDataUrl($scope.animalLink, function (result) {
                var image = {
                    image: result,
                    desc: $scope.animalName,
                    id: $scope.id++
                };
                console.log(image);
                imageService.addImage($scope.albumName, image);
            }, function (result) {
                console.log(result);
            });
    }

    $scope.deleteImage = function (index) {
        console.log(index);
        imageService.removeImage($scope.albumName, index);
        $scope.active = Math.max(0, index - 1);
    }

    $scope.active = 0;
}]);