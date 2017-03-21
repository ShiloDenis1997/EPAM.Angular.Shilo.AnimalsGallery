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