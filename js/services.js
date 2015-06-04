angular.module('starter.services', ['base64'])

.service('Auth', function($http, $q, $window, $base64) {
    return {
        hasUser: function() {
            return angular.fromJson($window.sessionStorage.currentUser).token != null;
        },

        getUser: function() {
            return angular.fromJson($window.sessionStorage.currentUser);
        },

        clearUser: function() {
            $window.sessionStorage.currentUser = null;
        },

        doLogin: function(credentials, callback) {
            $window.sessionStorage.currentUser = null

            if (credentials.username && credentials.password) {
                var req = {
                    method: 'POST',
                    url: API_url + 'rest/usuarios/auth',
                    headers: {
                        'usr': $base64.encode(credentials.username),
                        'pwd': $base64.encode(credentials.password)
                    }
                };

                $http(req).success(function(data, status, headers, config) {
                    $window.sessionStorage.currentUser = angular.toJson(data);
                    callback();
                }).
                error(function(data, status, headers, config) {
                    console.log('Problemas ao autenticar usuario', data);
                    callback();
                });
            } else {
                //ajustar pois está estorando erro
                //callback();
            }
        }
    }
})

.service('OcorrenciaService', function($http, $q, $window) {
    return {
        load: function(callback) {
        	//colocar no header o token
            var req = {
                method: 'GET',
                url: API_url + 'rest/ocorrencias/pontosConvertidos'
            };

            $http(req).success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback('erro');
            });
        }
    }
});

var API_url = 'http://192.168.0.14:8080/hm/';
