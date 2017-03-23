angular.module('animals').service('imageService', ['$http', function ($http) {
    var albums = [];
    $http.get('/Pictures/GetAllAlbums')
        .then(function(response) {
                albums = response.data;
            },
            function(response) {
                console.log("Cannot load albums");
                console.log(response);
            });

    return {
        getAlbums: getAlbums,
        getImages: getImages,
        addImage: addImage,
        createAlbum: createAlbum,
        removeImage: removeImage
    };

    function addImage(albumName, image) {
        if (albums[albumName] === undefined)
            return false;

        var imgData = { name: image.desc, data: image.image, albumName: albumName };
        $http.post('/Pictures/AddImage', imgData)
            .then(function (response, status, header, config) {
                console.log(response);
                var imgToAdd = { desc: response.data.desc, image: response.data.image, id: response.data.id };
                albums[albumName].push(imgToAdd);
            },
                function (response, status, header, config) {
                    console.log("Failed to post image");
                    console.log(response);
                });
        return true;
    }

    function createAlbum(albumName, userId) {
        $http.post('/Pictures/CreateAlbum', { albumName: albumName, userId: userId })
            .then(function (response, status, header, config) {
                    if (response.data.status) {
                        albums[albumName] = [];
                        console.log("album created");
                    } else {
                        console.log("cannot create album");
                    }
                },
                function (response, status, header, config) {
                    console.log("Failed to post image");
                    console.log(response);
                });
    }

    function removeImage(albumName, index) {
        if (albums[albumName] === undefined)
            return false;

        var imageToRemove = albums[albumName][0];
        if (imageToRemove == undefined)
            return false;

        $http.post('/Pictures/RemoveImage', imageToRemove.id)
            .then(function(response, status, header, config) {
                    console.log(response);
                    if (response.data.status) {
                        albums[albumName].splice(index, 1);
                        console.log("removed");
                    } else
                        console.log("cannot remove image");
                },
                function(response, status, header, config) {
                    console.log("Failed to remove image");
                    console.log(response);
                });
        return true;
    }

    function getImages(albumName) {
        return albums[albumName];
    }

    function getAlbums() {
        return albums;
    }

}]);