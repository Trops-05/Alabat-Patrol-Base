const CACHE_NAME = "troop-roster-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./about.html",
    "./contact.html",
    "./styles.css",
    "./script.js",
    "./jungle-fighter.jpeg",
    "./alabat logo.jpg",
    "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => reponse || fetch(event.request))
    );
});