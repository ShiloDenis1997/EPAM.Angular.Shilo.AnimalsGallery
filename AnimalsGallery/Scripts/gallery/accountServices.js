angular.module('gallery')
    .constant('AUTH_EVENTS',
    {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        logoutFailed: 'auth-logout-failed',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES',
    {
        all: '*',
        admin: 'Administrator',
        moderator: 'Moderator',
        user: 'User'
    })
    .factory('AuthService',
        function($http, $cookies, Session) {
            return {
                signIn: signIn,
                isAuthenticated: isAuthenticated,
                isAuthorized: isAuthorized,
                register: register,
                signOut: signOut,
                checkCookies: checkCookies
            };

            function checkCookies(currentUser) {
                console.log('starting checking cookies...');
                if ($cookies.get('login') === undefined)
                    return;
                currentUser.login = $cookies.get('login');
                currentUser.role = $cookies.get('role');
                currentUser.userId = $cookies.get('userId');
                Session.create(currentUser.userId, currentUser.login, currentUser.role);
                console.log(currentUser);
            }

            function setCookies() {
                $cookies.put('userId', Session.userId);
                $cookies.put('login', Session.login);
                $cookies.put('role', Session.role);
            }

            function removeCookies() {
                $cookies.remove('userId');
                $cookies.remove('login');
                $cookies.remove('role');
                $cookies.remove('.ASPXAUTH');
            }

            function signIn(credentials) {
                return $http
                    .post('/Account/SignIn', credentials)
                    .then(function (res) {
                        if (res.data.status) {
                            console.log('log success');
                            console.log(res.data);
                            Session.create(res.data.id, credentials.login, res.data.rights);
                            setCookies();
                        }
                    },function(res) {
                        console.log('log failed');
                        console.log(res);
                    });
            }

            function register(credentials) {
                return $http
                    .post('/Account/Register', credentials)
                    .then(function (res) {
                        if (res.data.status) {
                            console.log('log success');
                            console.log(res.data);
                            Session.create(res.data.id, credentials.login, res.data.rights);
                            setCookies();
                        }
                    }, function (res) {
                        console.log('log failed');
                        console.log(res);
                    });
            }

            function signOut() {
                return $http.post('/Account/SignOut')
                    .then(
                        function(result) {
                            console.log('success');
                            console.log(result);
                            if (result.data.status) {
                                removeCookies();
                                Session.destroy();
                            } else
                                console.log('cannot log out');
                        },
                        function(result) {
                            console.log('cannot log out');
                            console.log(result);
                        });
            };

            function isAuthenticated() {
                return !!Session.userId;
            }

            function isAuthorized(authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (isAuthenticated() &&
                    authorizedRoles.indexOf(Session.role) !== -1);
            }
        })
    .service('Session',
        function() {
            this.create = function (userId, login, role) {
                this.login = login;
                this.userId = userId;
                this.role = role;
            };
            this.destroy = function () {
                this.login = null;
                this.userId = null;
                this.role = null;
            };
            return this;
        })
    .controller('ApplicationController',
        function($scope,
            USER_ROLES,
            AuthService, AUTH_EVENTS, Session) {
            $scope.currentUser = { login: '', role: '', userId: '' };
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;
            $scope.isAuthenticated = AuthService.isAuthenticated;

            AuthService.checkCookies($scope.currentUser);
            console.log($scope.currentUser);
            $scope.$on(AUTH_EVENTS.loginSuccess,
                function(event, args) {
                    $scope.currentUser.login = Session.login;
                    $scope.currentUser.role = Session.role;
                    $scope.currentUser.userId = Session.userId;
                });
        })
    .controller('LoginController',
        function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
            $scope.credentials = {
                login: 'User',
                password: '12345678'
            };
            $scope.signIn = function(credentials) {
                AuthService.signIn(credentials)
                    .then(function() {
                            if (AuthService.isAuthenticated()) {
                                console.log('starting success login event');
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            } else {
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                            }
                        },
                        function() {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        });
            };

            $scope.register = function (credentials) {
                AuthService.register(credentials)
                    .then(function () {
                        if (AuthService.isAuthenticated()) {
                            console.log('starting success registration(login) event');
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        } else {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        }
                    },
                        function () {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        });
            };

            $scope.signOut = function() {
                AuthService.signOut()
                    .then(function() {
                            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                        },
                        function() {
                            $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
                        });
            };
        });