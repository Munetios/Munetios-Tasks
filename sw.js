/* Munetios Tasks Service Worker */
const CACHE_NAME = "munetios-tasks-v2";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "https://api.munetios.com/beautiful-css/beautiful.css",
  "https://api.munetios.com/fonts/google-sans-flex/googlesansflex.ttf",
  "https://api.munetios.com/fonts/material-symbols/MaterialSymbolsRounded-VariableFont_FILL\,GRAD\,opsz\,wght.ttf",
  "https://api.munetios.com/fonts/inter/inter.ttf",
  "https://api.munetios.com/fonts/open-sans/opensans.ttf",
  "https://api.munetios.com/fonts/roboto/roboto.ttf",
  "https://api.munetios.com/fonts/google-sans/googlesans.ttf",
  "https://api.munetios.com/fonts/lexend/lexend.ttf",
  "https://api.munetios.com/fonts/poppins/Poppins-Regular.ttf",
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html"))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});
