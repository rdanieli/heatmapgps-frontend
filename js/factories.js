angular.module('starter.factories', [])

.factory('MapFactory', function() {
    var showMap = function() {
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(-33, 151),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        return map;
    };

    return {
    	init: function() {
        	return showMap();
    	}
    };
})
