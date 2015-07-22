<script type="text/javascript">
  function initialize() {
    var origin = new google.maps.LatLng(40.820061,-73.97721360000003);
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
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var marker = new google.maps.Marker({
      position: origin,
      map: map,
      title: 'Edgewater Family Care'
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
</script>