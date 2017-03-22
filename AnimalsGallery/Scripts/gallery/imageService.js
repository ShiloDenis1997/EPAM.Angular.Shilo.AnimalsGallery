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

        var imgData = { name: image.desc, data: image.image, albumName: albumName };
        $http.post('/Pictures/AddImage', imgData)
            .then(function (response, status, header, config) {
                console.log(response);
                var imgToAdd = { desc: response.data.desc, image: response.data.image, id: response.data.id };
                albums[albumName].push(imgToAdd);
            },
                function (response, status, header, config) {
                    console.log("Failed to post image");
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