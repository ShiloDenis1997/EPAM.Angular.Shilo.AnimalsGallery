angular.module('gallery').controller('AddImageController',
['$scope', 'imageService', function ($scope, imageService) {
    console.log("hello from carousel1");
    $scope.albumName = "pandas";
    $scope.imageLink = "http://kids.nationalgeographic.com/content/dam/kids/photos/games/screen-shots/More%20Games/A-G/babyanimal_open.jpg";
    $scope.imageName = "Panda";
    $scope.addImageText = "Add image by url";
    $scope.fileButtonText = "Add from file";

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

    $scope.imageUpload = function (event) {
        var file = event.target.files[0]; //FileList object
        console.log('event');
        console.log(event);
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);

    }

    $scope.imageIsLoaded = function (e) {
        var image = {
            image: e.target.result,
            desc: $scope.imageName,
            id: $scope.id++
        };
        console.log(image);
        imageService.addImage($scope.albumName, image);
    }

    $scope.addImage = function () {
        console.log($scope.id);
        toDataUrl($scope.imageLink,
            function (result) {
                var image = {
                    image: result,
                    desc: $scope.imageName,
                    id: $scope.id++
                };
                console.log(image);
                imageService.addImage($scope.albumName, image);
            },
            function (result) {
                console.log("cannot load image");
                console.log(result);
            });
    }
}]);