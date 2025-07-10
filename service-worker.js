// This is the name for our cache, the storage where the app files will be kept.
const CACHE_NAME = 'finance-tracker-cache-v1';

// This is the list of files that make up the "shell" of our app.
// These are the files needed to show the basic interface.
const urlsToCache = [
  '/',
  '/index.html' 
  // Note: Since our CSS and JS are inside index.html, we only need to cache these two files.
];

// The 'install' event is fired when the service worker is first installed.
self.addEventListener('install', event => {
  // We use waitUntil to make sure the installation doesn't complete until the cache is populated.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// The 'fetch' event is fired every time the app requests a resource (like a file or an image).
self.addEventListener('fetch', event => {
  event.respondWith(
    // We check if the requested file is already in our cache.
    caches.match(event.request)
      .then(response => {
        // If we have a match in the cache, we return the cached file.
        if (response) {
          return response;
        }
        // If the file is not in the cache, we fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});
