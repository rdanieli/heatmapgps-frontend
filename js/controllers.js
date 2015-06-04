angular.module('starter.controllers', ['starter.services', 'starter.factories'])

.controller('MenuCtrl', function($scope, $location, Auth) {
    if (!Auth.hasUser()) {
        //manda para o login
        Auth.clearUser();
        $location.path('/');
    }
})

.controller('LoginCtrl', function($scope, $location, $ionicLoading, Auth) {
    // Form data for the login modal
    $scope.loginData = {};
    Auth.clearUser();

    $scope.doLogin = function() {
        $ionicLoading.show({
            content: 'Entrando...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        Auth.doLogin($scope.loginData, function() {
            $scope.msgErr = null;
            if (!Auth.hasUser()) {
                $location.path('/');
                $scope.msgErr = "Usuário ou senha incorretos";
            } else {
                $location.path('/map');
            }
            $scope.loginData = {};

            $ionicLoading.hide();
        });
    }

})

.controller('MapController', function($scope, $window, $ionicModal, MapFactory, OcorrenciaService) {

    $scope.startMap = function() {
        OcorrenciaService.load(function(data) {
            var map = MapFactory.init();

            var pinIcon = new google.maps.MarkerImage(
                "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|CCCCAA",
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new google.maps.Size(8, 8)
            ); 

            var points = [];

            for (var i = 0; i < data.length; i++) {
                var cor = JSON.parse(data[i].jsonLocal).coordinates;
                console.log('lat:' + cor[1] + ',lng:' + cor[0]);

                var latlng = new google.maps.LatLng(cor[1], cor[0]);

                new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: pinIcon
                    });

                points.push(latlng);
            };

            var pointArray = new google.maps.MVCArray(points);

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray
            });

            var gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ];

            heatmap.set('gradient', gradient);
            heatmap.set('radius', 100);

            heatmap.setMap(map);

            google.maps.event.addDomListener($window, 'load', map);
        });
    }

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];

})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
