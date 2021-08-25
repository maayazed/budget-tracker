const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    '/dist/app.bundle.js',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
];

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    )
});

self.addEventListener('activate', (e) => {
    const currentCache = [PRECACHE, RUNTIME];
    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCache.includes(cacheName));
            })
            .then((cacheDelete) => {
                return Promise.all(
                    cacheDelete.map((cacheDelete) => {
                        return caches.delete(cacheDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
            .then(function (res) {
                if (res) {
                    return res;
                }
                return fetch(e.request)
                    .then(
                        function (res) {
                            if (!res || res.status !== 200 || res.type !== basic) {
                                return res;
                            }

                            let resToCache = response.clone();

                            caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    cache.put(e.res, resToCache);
                                });
                            return res;
                        }
                    );
            })
    );
});