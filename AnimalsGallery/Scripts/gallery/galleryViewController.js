angular.module('gallery').controller('GalleryController',
['$scope', '$route', '$filter', '$timeout', '$anchorScroll',
    'imageService', 'galleryState', 'IMGSERVICE_EVENTS', 'IMGSERVICE_CONSTANTS',
function ($scope, $route, $filter, $timeout, $anchorScroll,
    imageService, galleryState, IMGSERVICE_EVENTS, IMGSERVICE_CONSTANTS) {
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
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pageSizes = [5, 10, 15, 20, 25, 30];
    console.log($scope.pageSizes);

    $scope.$on(IMGSERVICE_EVENTS.newFormatAdded, function (event, args) {
        console.log(args);
        $scope.state.formatsFilter[args] = true;
    });

    $scope.$watch('formats', function (oldFormats, newFormats) {
        var i;
        var keys = Object.keys($scope.state.formatsFilter);
        for (i = 0; i < newFormats.length; i++) {
            //console.log('before changing');
            //console.log(newFormats[i]);
            //console.log($scope.state.formatsFilter);
            if (keys.indexOf(newFormats[i]) === -1)
                $scope.state.formatsFilter[newFormats[i]] = true;
        }
    });

    $scope.getData = function () {
        if ($scope.albums[$scope.selectedAlbum]) {
            return $filter('byformat')($scope.albums[$scope.selectedAlbum].images, $scope.state.formatsFilter);
            //return $scope.albums[$scope.selectedAlbum].images;
        }
        return [];
    }

    $scope.newPageCallback = function () {
        $scope.currentImgId = '';
    }

    $scope.setPageSize = function (size) {
        $scope.pageSize = size;
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }

    $scope.deleteImage = function (image, albumName) {
        console.log(image);
        console.log(albumName);
        imageService.removeImageByImage(image, albumName);
    }

    $scope.createAlbum = function (albumName) {
        imageService.createAlbum(albumName, $scope.currentUser.userId);
        $scope.state.newAlbumName = '';
    }

    $scope.showTrashIcon = function (userId) {
        if ($scope.selectedAlbum === IMGSERVICE_CONSTANTS.all)
            return false;
        return $scope.albums[$scope.selectedAlbum].userId == $scope.currentUser.userId;
    }

    $scope.currentImgId = '';

    $scope.getCurrentClass = function (imgId) {
        if ($scope.currentImgId !== imgId) {
            return "landscape col-xs-12 col-sm-6 col-md-4 col-lg-3";
        }
        else {
            return "col-xs-12 img-selected";
        }
    }

    $scope.getCurrentStyle = function (imgId) {
        if ($scope.currentImgId !== imgId) {
            return { height: "250px", 'margin-bottom': 0 };
        }
        else {
            return {
                'max-height': 'calc(100vh - 150px)',
                'max-width': '100%',
                'margin-bottom': 0,
                'margin-left': 'auto',
                'margin-right': 'auto',
                display: 'block'
            };
        }
    }

    $scope.toggleImage = function (imgId) {
        if ($scope.currentImgId !== imgId) {
            $scope.currentImgId = imgId;
        } else {
            $scope.currentImgId = '';
        }
        //$scope.gotoAnchor(imgId);
        $timeout(function () { $scope.gotoAnchor(imgId); }, 100);
        console.log(imgId);
    }

    $scope.gotoAnchor = function (hash) {
        console.log(hash);
        //var old = $location.hash();
        //$location.hash(hash);
        $anchorScroll(hash);
        //$location.hash(old);
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

angular.module('gallery').filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});

angular.module('gallery').filter('byformat', function () {
    return function (images, formats) {
        var items = {
            formats: formats,
            out: []
        };
        angular.forEach(images, function (value, key) {
            if (this.formats[value.format] === true) {
                this.out.push(value);
            }
        }, items);
        return items.out;
    };
});