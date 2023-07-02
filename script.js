const button = document.getElementById("search-button");
const loc1 = document.getElementById("Location1");
const loc2 = document.getElementById("Location2");
const ad = document.getElementById("Address");

async function getData(lat, long) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=b1a2ab98ce3b41f49cb164110233006&q=${lat},${long}&aqi=yes`
  );
  return await promise.json();
}

async function gotLocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);

  loc1.innerText = `Latitude: ${result.location.lat}`;
  loc2.innerText = `Longitude: ${result.location.lon}`;
  ad.innerText = `Address: ${result.location.name}, ${result.location.region}, ${result.location.country}`;
}

function gotFailure() {
  console.log("Failed to get information");
}

button.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotLocation, gotFailure);
});
