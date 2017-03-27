angular.module('gallery')
    .config([
        '$locationProvider', '$routeProvider', 'USER_ROLES',
        function ($locationProvider, $routeProvider, USER_ROLES) {
            console.log("hello from config");
            $routeProvider
                .when('/Angular/Gallery',
                {
                    templateUrl: 'Views/Home/Gallery.html',
                    controller: 'GalleryController',
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
                            authorizedRoles: [USER_ROLES.all]
                        }
                    }
                )
                .otherwise({ redirectTo: '/Angular/About' });
            $locationProvider.html5Mode(true);
        }
    ])
    .run(function ($rootScope, AUTH_EVENTS, AuthService, USER_ROLES) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles) && !(authorizedRoles.indexOf(USER_ROLES.all) !== -1)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    console.log('User is not allowed');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    console.log('User is not authenticated');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
    });
    //.config(function($httpProvider) {
    //    $httpProvider.interceptors.push([
    //        '$injector',
    //        function($injector) {
    //            return $injector.get('AuthInterceptor');
    //        }
    //    ]);
    //})
    //.factory('AuthInterceptor', function ($rootScope, $q,
    //                                      AUTH_EVENTS) {
    //    return {
    //        responseError: function (response) {
    //            console.log('Intercept');
    //            if (response.status === 401) {
    //                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
    //                                      response);
    //            }
    //            if (response.status === 403) {
    //                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized,
    //                                      response);
    //            }
    //            if (response.status === 419 || response.status === 440) {
    //                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,
    //                                      response);
    //            }
    //            return $q.reject(response);
    //        }
    //    };
    //});