/* Header Variables */
const navBtns = document.querySelectorAll(".nav-btn");
const funcBtns = document.querySelectorAll(".func .nav-btn");
const arrows = document.querySelectorAll(".fa-angle-down");
const modals = document.querySelectorAll(".modal");
const logoWrapper = document.getElementById("logo-wrapper");
const logoImg = document.getElementById("logo-img");
const logo = document.getElementById("logo");
const cartIcon = document.getElementById("cart-icon");

/* Colors */
const lightGrey = "#FAF9F6";
const darkGrey = "#6F7378";

/* etc. */
const transitionDuration = "0.2s";
const hidden = "hidden";
const arrowDuration = 100;
const rotate0 = "rotate(0)";
const rotate180 = "rotate(180deg)";
const forwards = "forwards";
const click = "click";
const radius = 1000;
const gym = "gym";

/* Flags */
let isOpen = false;
let login = false;

// Top Nav Bar Left Btns Modal
funcBtns.forEach((btn) => {
  btn.addEventListener(click, (event) => {
    event.preventDefault();

    if (!btn.nextElementSibling.classList.contains(hidden)) {
      btn.nextElementSibling.classList.add(hidden);
      isOpen = false;
      btn.childNodes[1].animate(
        {
          transform: [rotate0],
        },
        {
          duration: arrowDuration,
          fill: forwards,
        }
      );
    } else {
      modals.forEach((modal, idx) => {
        modal.classList.add(hidden);
        funcBtns[idx].childNodes[1].animate(
          {
            transform: [rotate0],
          },
          {
            duration: arrowDuration,
            fill: forwards,
          }
        );
      });
      btn.nextElementSibling.classList.remove(hidden);
      isOpen = true;
      btn.childNodes[1].animate(
        {
          transform: [rotate180],
        },
        {
          duration: arrowDuration,
          fill: forwards,
        }
      );
    }
  });
});

/* Cart Icon Clicked Event */
cartIcon.addEventListener(click, () => {
  if (!login) {
    alert("Please sign in first.");
  }
});

/* Get Current Geolocation and Load Google Map */
let map, infoWindow, myLatestLocation, marker;
let markers = [];

function initMap() {
  const skku = { lat: 37.29402, lng: 126.97467 };
  //   const seoul = { lat: 37.5326, lng: 127.024612 };
  myLatestLocation = skku;

  map = new google.maps.Map(document.getElementById("map"), {
    center: skku,
    zoom: 15,
  });

  addMarker(skku);

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
  locationButton.addEventListener(click, () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          map.setCenter(pos);

          myLatestLocation.lat = pos.lat;
          myLatestLocation.lng = pos.lng;
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  const request = {
    location: myLatestLocation,
    radius: radius,
    type: [gym],
  };

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });

  map.addListener(click, (e) => {
    deleteMarkers();
    placeMarkerAndPanTo(e.latLng, map);

    const request = {
      location: myLatestLocation,
      radius: radius,
      type: [gym],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  });

  map.addListener("center_changed", () => {
    deleteMarkers();
    addMarker(myLatestLocation);

    const request = {
      location: myLatestLocation,
      radius: radius,
      type: [gym],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, click, () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function addMarker(position) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  markers.push(marker);
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function hideMarkers() {
  setMapOnAll(null);
}

function showMarkers() {
  setMapOnAll(map);
}

function deleteMarkers() {
  hideMarkers();
  markers = [];
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });

  map.panTo(latLng);

  markers.push(marker);
}

window.initMap = initMap;
