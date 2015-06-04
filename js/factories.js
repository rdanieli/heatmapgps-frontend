angular.module('starter.factories', [])

.factory('MapFactory', function() {
    var showMap = function() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(-30.1008231,-51.1589488),
            mapTypeId: google.maps.MapTypeId.SATELLITE
        }

        return new google.maps.Map(document.getElementById("map"), mapOptions);

		// navigator.geolocation.getCurrentPosition(function(pos) {
            //map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //var myLocation = new google.maps.Marker({
             //   position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
             //   map: map,
             //   title: "My Location"
            //});
        //});
    };

    return {
    	init: function() {
        	return showMap();
    	}
    };
})
