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

.factory('RotaFactory', function(){
    function init(map, ocorrencias, policeLocation) {
        var directionsService = new google.maps.DirectionsService();
        //var directionsDisplay = new google.maps.DirectionsRenderer;
        //directionsDisplay.setMap(map);

        function calculateAndDisplayRoute(directionsService, 
                                          ocorrencias, 
                                          policeLocation) {
            var waypts = [];
            
            waypts.push({location:policeLocation.position});

            var i = 0;

            for (; i < ocorrencias.length; i++) {
                var cor = JSON.parse(ocorrencias[i].jsonLocal).coordinates;

                var latlng = new google.maps.LatLng(cor[1], cor[0]);

                waypts.push({location:latlng});
            }

            i = 0;
            ocorrencias = [];

            for (; i < waypts.length; i+=9) {
                
                var src  = waypts[i].location;
                var dest = waypts[Math.min(i+9, waypts.length-1)].location;
                var way = waypts.slice(i+1,Math.min(i+9, waypts.length-1));

                directionsService.route({
                    origin: src,
                    destination: dest,
                    waypoints: way,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING
                }, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        var polyline = new google.maps.Polyline({
                                      path: [],
                                      strokeColor: '#FF0000',
                                      strokeWeight: 3
                                    });
                        
                        var bounds = new google.maps.LatLngBounds();

                        var legs = response.routes[0].legs;
                        for (i=0;i<legs.length;i++) {
                          var steps = legs[i].steps;
                          for (j=0;j<steps.length;j++) {
                            var nextSegment = steps[j].path;
                            for (k=0;k<nextSegment.length;k++) {
                              polyline.getPath().push(nextSegment[k]);
                              bounds.extend(nextSegment[k]);
                            }
                          }
                        }

                        map.fitBounds(bounds);
                        polyline.setMap(map);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
        };

        calculateAndDisplayRoute(directionsService, ocorrencias, policeLocation);
    };

    return {
        calculate: function(map, data, policeLocation){
            init(map, data, policeLocation);
        }
    }
});