angular.module('starter.factories', [])

.factory('MapFactory', function() {
    var showMap = function(place) {
        var mapType = google.maps.MapTypeId.SATELLITE;

        if(place)
            mapType = google.maps.MapTypeId.ROADMAP;

        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(-30.1008231, -51.1589488),
            mapTypeId:mapType
        }

        return new google.maps.Map(document.getElementById( (place ? place : "map") ), mapOptions);
    };

    return {
        init: function(place) {
            return showMap(place);
        },

        phonePosition: function(onSuccess, onError) {
            var options = {
                maximumAge: 0, 
                timeout: 7500, 
                enableHighAccuracy:true
            };

            return navigator.geolocation.watchPosition(onSuccess, onError, options);
        }
    };
})

