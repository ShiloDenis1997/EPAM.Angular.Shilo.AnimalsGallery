angular.module('gallery').service('textPartsService',
        function($http) {
            return {
                getTextPart: getTextPart,
                setTextPart: setTextPart
            };

            function getTextPart(textPart) {
                $http.get('/TextParts/GetTextPart/' + textPart.name)
                    .then(function(result) {
                            if (result.data.status) {
                                textPart.text = result.data.text;
                                console.log('textPart getted');
                                console.log(textPart);
                            } else {
                                console.log('invalid part name');
                            }
                        },
                        function(result) {
                            console.log('text part get failed');
                        });
            }

            function setTextPart(textPart) {
                $http.post('TextParts/SetTextPart', textPart)
                    .then(function(result) {
                            if (result.data.status) {
                                console.log('success setted text part');
                            } else {
                                console.log('failed to set text part');
                            }
                        },
                        function() {
                            console.log('failed to set textParrt');

                        });
            }
        });