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

.controller('MapController', function($scope, $window, $ionicModal, MapFactory) {

    $scope.startMap = function() {
        var map = MapFactory.init();

        google.maps.event.addDomListener($window, 'load', map);
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
