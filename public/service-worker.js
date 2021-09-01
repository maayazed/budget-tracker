const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/index.js',
  '/dist/app.bundle.js',
  '/dist/manifest.b5265321f587e7e3ef8581e0dd737a6e.json',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
];

const CACHE_NAME = 'Transaction';
const DATA_CACHE_NAME = 'TransactionDB-v01';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(DATA_CACHE_NAME)
      .then((cache) => cache.add(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
  );
  self.clients.claim();
})

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api/')) {
    e.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(e.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(e.request.url, response.clone());
              }
              return response;
            })
            .catch(err => {
              return cache.match(e.request);
            });
        })
        .catch(err => console.log(err))
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(e.request).then(res => {
        return res || fetch(e.request);
      });
    })
  );
});