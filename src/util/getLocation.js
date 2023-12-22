import { locations } from "../constants/locations";

const toRadians = (degree) => {
  return degree * (Math.PI / 180);
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function getCurrentLocation(success, errorsHandler) {
  let getPosition = () =>
    navigator.geolocation.getCurrentPosition(success, errorsHandler, options);

  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        console.log(result);
        if (result.state === "granted") {
          console.log("izin var!");
          getPosition();
        } else if (result.state === "prompt") {
          console.log("bell değil sanırım");
          getPosition();
        } else if (result.state === "denied") {
          console.log("izin yok!");
          getPosition();
        }
      });
  } else {
    console.log("bu tarayıcıda geolocation desteklenmiyor!");
  }
}

export function calculateDistance(pos) {
  var crd = pos.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  let distance = 999;
  const R = 6371;
  let bayi = {};

  for (let i = 0; i < locations.length; i++) {
    const dLat = toRadians(locations[i].lat - crd.latitude);
    const dLon = toRadians(locations[i].lng - crd.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(crd.latitude)) *
        Math.cos(toRadians(locations[i].lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    if (d < distance) {
      distance = R * c;
      bayi = locations[i];
    }
  }
  return bayi;
}
