angular.module('animals')
    .service('localStorage',
        function() {
            var storage = [];

            return {
                loadValue: loadValue,
                storeValue: storeValue,
                removeValue: removeValue
            }

            function loadValue(key) {
                console.log('loaded');
                return storage[key];
            }

            function storeValue(key, value) {
                storage[key] = value;
            }

            function removeValue(key) {
                storage[key] = undefined;
            }
        });