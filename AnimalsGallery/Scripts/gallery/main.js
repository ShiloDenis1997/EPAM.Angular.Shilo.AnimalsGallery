angular.module('animals', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);
angular.module('animals').service('imageService', function () {
    var albums = [];

    return {
        getAlbums: getAlbums,
        getImages: getImages,
        addImage: addImage,
        removeImage: removeImage
    };

    function addImage(albumName, image) {
        albums[albumName] = albums[albumName] || [];
        albums[albumName].push(image);
    };

    function removeImage(albumName, index) {
        albums[albumName] = albums[albumName] || [];
        albums[albumName].splice(index, 1);
    };

    function getImages(albumName) {
        return albums[albumName];
    };

    function getAlbums() {
        return albums;
    }

});

angular.module('animals').controller('GalleryController',
['$scope', 'imageService', function ($scope, imageService) {
    console.log("hello from carousel1");
    $scope.albumName = "pandas";
    $scope.animalLink = "http://kids.nationalgeographic.com/content/dam/kids/photos/games/screen-shots/More%20Games/A-G/babyanimal_open.jpg";
    $scope.animalName = "Panda";

    console.log($scope.albumName);
    $scope.album = imageService.getAlbums();
    $scope.images = imageService.getImages($scope.albumName);
    $scope.id = 0;
    $scope.getImage = function () {
        console.log($scope.id);
        var image = {
            image: $scope.animalLink,
            desc: $scope.animalName,
            id: $scope.id++
        };
        imageService.addImage($scope.albumName, image);
    }

    $scope.deleteImage = function (index) {
        console.log(index);
        imageService.removeImage($scope.albumName, index);
        $scope.active = Math.max(0, index - 1);
    }

    $scope.active = 0;
}]);

angular.module('animals').controller('ModalDemoCtrl',
    ['$uibModal', '$log', '$document', '$scope', 'imageService',
        function ($uibModal, $log, $document, $scope, imageService) {
            console.log("modal window");
            var $ctrl = this;
            $ctrl.id = 0;
            $scope.albumName = "pandas";
            $ctrl.albums = imageService.getImages;
            $ctrl.items = [];
            $ctrl.active = 0;
            $ctrl.animationsEnabled = true;

            $ctrl.open = function (size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        items: function () {
                            return imageService.getImages($scope.albumName);
                        },
                        albumName: function() {
                            return $scope.albumName;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };
        }]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('animals').controller('ModalInstanceCtrl', ['$uibModalInstance', 'imageService', 'items', 'albumName', function ($uibModalInstance, imageService, items, albumName) {
    var $ctrl = this;
    $ctrl.items = items;
    console.log(items);
    $ctrl.deleteImage = function (index) {
        console.log(albumName);
        imageService.removeImage(albumName, index);
        $ctrl.active = Math.max(0, index - 1);
    }

    $ctrl.ok = function () {
        console.log("OK");
        $uibModalInstance.close('ok');
    };

    $ctrl.cancel = function () {
        console.log("Cancel");
        $uibModalInstance.dismiss('cancel');
    };
}]);

angular.module('animals')
    .controller('AboutController',
    [
        '$scope', function($scope) {
            $scope.information = [
                { text: "first enot", edit: false },
                { text: "second enot", edit: false },
                { text: "third enot", edit: false }
            ];

            $scope.toggleEdit = function(info) {
                info.edit = !info.edit;
            }
        }
    ]);

angular.module('animals').config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        console.log("hello from config");
        $routeProvider
            .when('/Angular/Gallery',
            {
                templateUrl: 'Home/Gallery',
                controller: 'GalleryController'
            })
            .when('/Angular/Albums',
            {
                templateUrl: 'Home/Albums',
                controller: 'ModalDemoCtrl as $ctrl'
            })
            .when('/Angular/About',
            {
                templateUrl: 'Home/About',
                controller: 'AboutController'
            })
            .otherwise({ redirectTo: '/Angular/About' });
        $locationProvider.html5Mode(true);
    }
]);

$(document).ready(function () {
    /* affix the navbar after scroll below header */
    $(".navbar").affix({ offset: { top: $("header").outerHeight(true) } });
});