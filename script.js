const options = {
    enableHighAccuracy: true,
    maximunAge: 1000
}

let currentLocation = null;
let pointA = null;
let pointB = null;
let distance = null;

function main() {
    let geolocation = null;
    if (window.navigator && window.navigator.geolocation) {
        geolocation = window.navigator.geolocation;
    }
    if (geolocation) {
        geolocation.watchPosition(onLocationUpdate, onError, options);
    }
    else {
        alert("Can not access to your current location");
    }
}

function onLocationUpdate(event) {
    currentLocation = event.coords;
}

function onError(error) {
    console.log("Cannot access location:", error);
}

function setA() {
    pointA = currentLocation;
    updateInfo();
}

function setB() {
    pointB = currentLocation;
    updateInfo();
}

function updateInfo() {
    if (pointA !== null) {
        document.getElementById("aBtn").innerHTML = `(R,${pointA.longitude}, ${pointA.latitude})`;
    }
    if (pointB !== null) {
        document.getElementById("bBtn").innerHTML = `(R,${pointB.longitude}, ${pointB.latitude})`;
    }
    if (pointA !== null && pointB !== null) {
        distance = formatNumber(getDistance(pointA, pointB));
        document.getElementById("info").innerHTML = `Distance: ${distance} meters`;
    }
}

function getDistance(pointA, pointB) {
    const pi = Math.PI;
    const EarthRadius = 6_371_000;
    const [longitudeA, latitudeA] = [pointA.longitude * pi / 180, pointA.latitude * pi / 180];
    const [longitudeB, latitudeB] = [pointB.longitude * pi / 180, pointB.latitude * pi / 180];

    const cosLatA = Math.cos(latitudeA);
    const sinLatA = Math.sin(latitudeA);
    const cosLatB = Math.cos(latitudeB);
    const sinLatB = Math.sin(latitudeB);
    const cosLonAMinusB = Math.cos(longitudeA - longitudeB);

    const cosineAngle = (cosLatA * cosLatB * cosLonAMinusB) + (sinLatA * sinLatB);
    const angle = Math.acos(cosineAngle);
    return (Math.floor(EarthRadius * angle));
}

function formatNumber(number) {
    const numberToString = String(number);
    const arrayNumber = numberToString.split("").reverse();
    for (let index = 3; index < arrayNumber.length; index = index + 4) {
        arrayNumber.splice(index, 0, ",");
    }
    return arrayNumber.reverse().join("");
}
