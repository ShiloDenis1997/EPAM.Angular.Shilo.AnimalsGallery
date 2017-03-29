angular.module('gallery')
    .config([
        '$locationProvider', '$routeProvider', 'USER_ROLES',
        function ($locationProvider, $routeProvider, USER_ROLES) {
            console.log("hello from config");
            $routeProvider
                .when('/Angular/Gallery/:album',
                {
                    templateUrl: 'Views/Home/Gallery.html',
                    controller: 'GalleryController',
                    data: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/Angular/Gallery',
                {
                    redirectTo: '/Angular/Gallery/all',
                    data: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/Angular/Albums',
                {
                    templateUrl: 'Views/Home/Albums.html',
                    controller: 'ModalDemoCtrl as $ctrl',
                    data: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/Angular/About',
                {
                    templateUrl: 'Views/Home/About.html',
                    controller: 'AboutController',
                    data: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/Angular/AddImage',
                    {
                        templateUrl: 'Views/Home/AddImage.html',
                        controller: 'AddImageController',
                        data: {
                            authorizedRoles: [USER_ROLES.user, USER_ROLES.admin, USER_ROLES.moderator]
                        }
                    }
                )
                .otherwise({ redirectTo: '/Angular/About' });
            $locationProvider.html5Mode(true);
        }
    ])
    .run(function($anchorScroll) {
        $anchorScroll.yOffset = 50;
    })
    .run(function ($rootScope, AUTH_EVENTS, AuthService, USER_ROLES) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            console.log('event');
            console.log(event);
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles) && !(authorizedRoles.indexOf(USER_ROLES.all) !== -1)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    console.log('User is not allowed');
                    alert('Your have no rights to use this feature');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    console.log('User is not authenticated');
                    alert('Only authenticated users can use this feature');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    });