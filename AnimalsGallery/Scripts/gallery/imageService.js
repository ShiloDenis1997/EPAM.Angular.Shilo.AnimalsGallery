angular.module('animals').service('imageService', ['$http', function ($http) {
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
        var data = { name: image.desc, data: image.image, albumName: albumName };
        $http.post('/Pictures/AddImage', data)
            .then(function (data, status, header, config) {
                console.log(data);
            },
                function (data, status, header, config) {
                    console.log(data);
                });
    };

    function removeImage(albumName, index) {
        albums[albumName] = albums[albumName] || [];
        albums[albumName].splice(index, 1);
    };

    function getImages(albumName) {
        $http({ method: 'GET', url: '/Pictures/Picture/' + albumName })
            .then(function (data, status, headers, config) {
                console.log(data.data);
                albums[albumName].push(data.data);
            }, function (data, status, headers, config) {
                console.log("error getting json: " + data);
            });
        return albums[albumName];
    };

    function getAlbums() {
        return albums;
    }

}]);