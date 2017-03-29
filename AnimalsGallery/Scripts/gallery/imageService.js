angular.module('gallery')
    .constant('IMGSERVICE_EVENTS',
    {
        newFormatAdded: 'newFormatAdded'
    })
    .constant('IMGSERVICE_CONSTANTS',
    {
        all: 'all'
    })
.service('imageService', ['$http', '$rootScope', 'IMGSERVICE_EVENTS', 'IMGSERVICE_CONSTANTS', function ($http, $rootScope, IMGSERVICE_EVENTS, IMGSERVICE_CONSTANTS) {
    var albums = [];
    albums[IMGSERVICE_CONSTANTS.all] = { images: [], name: '', rating: -1 };
    var albumNames = [IMGSERVICE_CONSTANTS.all];
    var formats = [];

    $http.get('/Pictures/GetAllAlbums')
        .then(function (response) {
            console.log('keys');
            Object.keys(response.data).forEach(function (key) {
                albums[key] = response.data[key];
                albumNames.push(key);
                var images = albums[key].images;
                for (var i = 0; i < images.length; i++) {
                    albums[IMGSERVICE_CONSTANTS.all].images.push(images[i]);
                }
            });
        },
            function (response) {
                console.log("Cannot load albums");
                console.log(response);
            });

    $http.get('/Pictures/GetAllFormats')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                tryAddNewFormat(response.data[i]);
            }
            console.log(formats);
        },
            function (response) {
                console.log('Cannot load image formats');
            });

    return {
        getAlbums: getAlbums,
        getFormats: getFormats,
        getImages: getImages,
        addImage: addImage,
        createAlbum: createAlbum,
        removeImage: removeImage,
        getAlbumNames: getAlbumNames,
        removeImageByImage: removeImageByImage
    };

    function getFormats() {
        return formats;
    }

    function getAlbumNames() {
        return albumNames;
    }

    function tryAddNewFormat(format) {
        if (formats.indexOf(format) === -1) {
            formats.push(format);
            $rootScope.$broadcast(IMGSERVICE_EVENTS.newFormatAdded, format);
        }
    }

    function addImage(albumName, image) {
        if (albums[albumName] === undefined)
            return false;

        var imgData = { name: image.desc, data: image.image, albumName: albumName };
        $http.post('/Pictures/AddImage', imgData)
            .then(function (response, status, header, config) {
                console.log(response);
                var imgToAdd = {
                    desc: response.data.desc,
                    image: response.data.image,
                    id: response.data.id,
                    date: response.data.date,
                    format: response.data.format
                };
                tryAddNewFormat(imgToAdd.format);
                albums[albumName].images.push(imgToAdd);
                albums[IMGSERVICE_CONSTANTS.all].images.push(imgToAdd);
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
                    albumNames.push(albumName);
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
            .then(function (response, status, header, config) {
                console.log(response);
                if (response.data.status) {
                    albums[albumName].images.splice(index, 1);
                    var indexOfImageFromAll = albums[IMGSERVICE_CONSTANTS.all].images.indexOf(imageToRemove);
                    albums[IMGSERVICE_CONSTANTS.all].images.splice(indexOfImageFromAll, 1);
                    console.log("removed");
                } else
                    console.log("cannot remove image");
            },
                function (response, status, header, config) {
                    console.log("Failed to remove image");
                    console.log(response);
                });
        return true;
    }

    function removeImageByImage(image, albumName) {
        if (albums[albumName] === undefined)
            return false;

        var index = albums[albumName].images.indexOf(image);
        if (index == -1)
            return false;
        var imageToRemove = albums[albumName].images[index];
        if (imageToRemove == undefined)
            return false;
        console.log(imageToRemove);
        $http.post('/Pictures/RemoveImage', { id: imageToRemove.id })
            .then(function (response, status, header, config) {
                console.log(response);
                if (response.data.status) {
                    albums[albumName].images.splice(index, 1);
                    console.log("removed");
                } else
                    console.log("cannot remove image");
            },
                function (response, status, header, config) {
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