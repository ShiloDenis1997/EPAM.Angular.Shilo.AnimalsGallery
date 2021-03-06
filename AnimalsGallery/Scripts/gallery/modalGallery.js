﻿angular.module('gallery').controller('ModalDemoCtrl',
    ['$uibModal', '$log', '$document', '$scope', 'imageService',
        function ($uibModal, $log, $document, $scope, imageService) {
            console.log("modal window");
            var $ctrl = this;
            $ctrl.id = 0;
            $scope.albumName = "pandas";
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
                    windowClass: 'modal-fullscreen',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        items: function () {
                            return imageService.getImages($scope.albumName);
                        },
                        albumName: function () {
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
        }]);


angular.module('gallery').controller('ModalInstanceCtrl', ['$uibModalInstance', 'imageService', 'items', 'albumName', function ($uibModalInstance, imageService, items, albumName) {
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