angular.module('starter.services', ['base64'])

.service('Auth', function($http, $q, $window, $base64, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint);
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
                //$http.defaults.headers.post["Content-Type"] = "multipart/form-data";
                
                $http.post(ApiEndpoint.url + '/rest/usuarios/auth', '', {headers: {
                    'usr': $base64.encode(credentials.username),
                    'pwd': $base64.encode(credentials.password)
                }}).
                then(function(response) {
                    $window.sessionStorage.currentUser = angular.toJson(response.data);
                    callback();
                }, function(response) {
                    callback("Erro ao autenticar usuário");
                });
            } else {
                //ajustar pois está estorando erro
                //callback();
            }
        }
    }
})
.service('BairroService', function($http, $q, $window, $base64, ApiEndpoint) {
    return {
        todosBairros: function(callback) {
          //colocar no header o token
            var req = {
                method: 'GET',
                url: ApiEndpoint.url + '/rest/bairros/lista'
            };

            $http(req).success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback('erro');
            });  
        }
    }
})
.service('OcorrenciaService', function($http, $q, $window, ApiEndpoint) {
    return {
        load: function(callback, filtro) {
        	var req;

            if(filtro) {
                req = {
                    method: 'POST',
                    //header
                    url: ApiEndpoint.url + '/rest/ocorrencias/filtraMapa',
                    data: filtro
                };
            } else {
            //colocar no header o token
            req = {
                method: 'GET',
                url: ApiEndpoint.url + '/rest/ocorrencias/pontosConvertidos'
            };
        }
            $http(req).success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback('erro');
            });
        },

        descricaoFatos: function(callback) {
          //colocar no header o token
            var req = {
                method: 'GET',
                url: ApiEndpoint.url + '/rest/ocorrencias/descricaoFatos'
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