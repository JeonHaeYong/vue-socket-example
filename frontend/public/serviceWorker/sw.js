// 1. open cache
// 2. file cache
// 3. cache check
var CACHE_NAME = 'my-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico'
];
console.log('sw.js!!!!');
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if(response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(res => {
          // Check if we received a valid response
          if(!(!res || res.status !== 200 || res.type !== 'basic')) {
            // INPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = res.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return res;
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [];  // add cache names which you do not want to delete
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', event => {
  console.log('push Event~~~', event);
  event.waitUntil(
    self.registration.showNotification('Notification!!!', {
      body: '새로운 메세지'
    })
  );
});