angular.module('gallery').service('imageService', ['$http', function ($http) {
    var albums = [];
    $http.get('/Pictures/GetAllAlbums')
        .then(function (response) {
                console.log('keys');
                Object.keys(response.data).forEach(function(key) {
                    albums[key] = response.data[key];
                });
                //albums = response.data;
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
                albums[albumName].images.push(imgToAdd);
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
                        albums[albumName] = { images: [], rating: 0, userId: userId };
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

        var imageToRemove = albums[albumName].images[index];
        if (imageToRemove == undefined)
            return false;
        console.log(imageToRemove);
        $http.post('/Pictures/RemoveImage', { id: imageToRemove.id })
            .then(function(response, status, header, config) {
                    console.log(response);
                    if (response.data.status) {
                        albums[albumName].images.splice(index, 1);
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
        return albums[albumName].images;
    }

    function getAlbums() {
        return albums;
    }

}]);