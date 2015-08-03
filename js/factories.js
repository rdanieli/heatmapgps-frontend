angular.module('starter.factories', [])

.factory('MapFactory', function() {
    var showMap = function() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(-30.1008231, -51.1589488),
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

// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.
.factory(
    "transformRequestHeader",
    function() {
        // I prepare the request data for the form post.
        function transformRequest(data, getHeaders) {
            var headers = getHeaders();
            headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
            return (serializeData(data));
        }
        // Return the factory value.
        return (transformRequest);
        // ---
        // PRVIATE METHODS.
        // ---
        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData(data) {
            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {
                return ((data == null) ? "" : data.toString());
            }
            var buffer = [];
            // Serialize each key in the object.
            for (var name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                var value = data[name];
                buffer.push(
                    encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent((value == null) ? "" : value)
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join("&")
                .replace(/%20/g, "+");
            return (source);
        }
    }
);
