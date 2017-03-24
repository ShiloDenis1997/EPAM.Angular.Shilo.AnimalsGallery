angular.module('animals')
    .controller('IndexController',
    [
        '$scope', '$http', '$cookies', 'localStorage',
        function ($scope, $http, $cookies, localStorage) {
            console.log('hello from indexController');
            $scope.height = $('header').outerHeight(true);
            console.log($scope.height);
            $scope.user = localStorage.loadValue('user');
            $scope.login = 'User';
            $scope.password = '12345678';
            $cookies.remove('.ASPXAUTH');

            $scope.signIn = function() {
                $http.post('/Account/SignIn',
                        { login: $scope.login, password: $scope.password })
                    .then(
                        function(result) {
                            console.log('success');
                            console.log(result);
                            if (result.data.status) {
                                localStorage.storeValue('user', { login: $scope.login, rights: result.data.rights });
                                $scope.user = localStorage.loadValue('user');
                            }
                        },
                        function(result) {
                            console.log('fail');
                            console.log(result);
                        });
            };

            $scope.register = function() {
                $http.post('/Account/Register',
                        { login: $scope.login, password: $scope.password })
                    .then(
                        function(result) {
                            console.log('success');
                            console.log(result);
                            if (result.data.status) {
                                localStorage.storeValue('user', { login: $scope.login, rights: result.data.rights });
                                $scope.user = localStorage.loadValue('user');
                            }
                        },
                        function(result) {
                            console.log('fail');
                            console.log(result);
                        });
            };

            $scope.signOut = function()
            {
                $http.post('/Account/SignOut',
                        { login: $scope.login, password: $scope.password })
                    .then(
                        function (result) {
                            console.log('success');
                            console.log(result);
                            if (result.data.status) {
                                localStorage.removeValue('user');
                                $scope.user = localStorage.loadValue('user');
                            }
                        },
                        function (result) {
                            console.log('fail');
                            console.log(result);
                        });
            };
        }
    ]);