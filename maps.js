
function initialize() {
  var origin = new google.maps.LatLng(40.819935,-73.977059);
  var centerLat, centerLng;
  if (document.documentElement.clientWidth >= 768) {
    centerLat = 40.820061;
    centerLng = -73.979;
  } else {
    centerLat = 40.821;
    centerLng = -73.97721360000003;
  }
  var mapOptions = {
    center: { lat: centerLat, lng: centerLng},
    zoom: 17
  };

  var styles = [
    {
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "transit",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
    }
  ];

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  map.setOptions({styles: styles});

  var marker = new google.maps.Marker({
    position: origin,
    map: map,
    title: 'Edgewater Family Care'
  });

  marker.addListener('click', function() { window.open("https://www.google.com/maps/place/Edgewater+Family+Care/@40.8200375,-73.9771488,17.23z/data=!4m2!3m1!1s0x89c2f64c1c0ffb4d:0x2033da58fb023bff");
  });
}
google.maps.event.addDomListener(window, 'load', initialize);