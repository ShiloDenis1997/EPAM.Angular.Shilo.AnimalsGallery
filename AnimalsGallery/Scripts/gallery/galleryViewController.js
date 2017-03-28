angular.module('gallery').controller('GalleryController',
['$scope', '$route', 'imageService', 'galleryState', 'IMGSERVICE_EVENTS',
    function ($scope, $route, imageService, galleryState, IMGSERVICE_EVENTS) {
    console.log('controller loaded');
    $scope.newAlbumName = '';
    $scope.albums = imageService.getAlbums();
    $scope.albumNames = imageService.getAlbumNames();
    console.log($route);
    $scope.selectedAlbum = $route.current.params.album;
    console.log($scope.albums);
    $scope.id = 0;
    $scope.formats = imageService.getFormats();
    $scope.formatsfilter = [];
    $scope.state = galleryState.getState();
    console.log($scope.formats);

    $scope.$on(IMGSERVICE_EVENTS.newFormatAdded, function (event, args) {
        console.log(args);
        $scope.state.formatsFilter[args] = true;
    });

    $scope.getAlbums = function (selectedAlbum) {
        if (selectedAlbum == 'all') {
            return $scope.albumNames;
        }
        return [selectedAlbum];
    }

    $scope.deleteImage = function (image, albumName) {
        console.log(image);
        console.log(albumName);
        imageService.removeImageByImage(image, albumName);
        //imageService.removeImage(albumName, index);
    }

    $scope.createAlbum = function (albumName) {
        imageService.createAlbum(albumName, $scope.currentUser.userId);
        $scope.state.newAlbumName = '';
    }

    $scope.active = 0;
}]);

angular.module('gallery').service('galleryState', function () {
    var state = {
        newAlbumName: '',
        formatsFilter: [],
    };

    function getState() {
        return state;
    }

    return {
        getState: getState
    };
});


angular.module('gallery').filter('byformat', function () {
    return function (images, formats) {
        var items = {
            formats: formats,
            out: []
        };
        //console.log(items);
        angular.forEach(images, function (value, key) {
            if (this.formats[value.format] === true) {
                this.out.push(value);
            }
        }, items);
        return items.out;
    };
});