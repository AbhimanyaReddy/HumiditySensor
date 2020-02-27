function initMap() {
    // The location of Uluru
    var uluru = {lat: 17.4399, lng: 78.3783};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }