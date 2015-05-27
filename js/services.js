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
				    url: 'http://localhost:8080/hm/rest/usuarios/auth',
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
            }
        }
    }
});
