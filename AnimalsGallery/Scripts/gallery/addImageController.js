angular.module('gallery').controller('AddImageController',
['$scope', 'imageService', function ($scope, imageService) {
    console.log("hello from add image controller");
    $scope.albumName = "";
    $scope.imageLink = "http://kids.nationalgeographic.com/content/dam/kids/photos/games/screen-shots/More%20Games/A-G/babyanimal_open.jpg";
    $scope.imageName = "Panda";
}]);