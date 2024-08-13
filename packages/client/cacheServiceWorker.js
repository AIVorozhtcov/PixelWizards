const VERSION = '0.0.1';
const CACHE_NAME = `capybara-game-cache-v-${VERSION}`;
const TIMOUT_CONNECTION = 5000;

const URLS = [
  '/',
];

const CACHE_URLS = URLS.concat('%FILESURLS%'.split(','));

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
      .catch(error => console.log(error))
  );

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches
      .keys()
      .then(cachesNames => {
        return Promise.all(
          cachesNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        )
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const networkResponse = response.clone();

        await caches
          .open(CACHE_NAME)
          .then(cache => {
            if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
              cache.put(event.request, networkResponse);
            }
          });

        return response;
      })
      .catch(async () => {
        console.log('Оффлайн');

        return await caches
          .open(CACHE_NAME)
          .then(cache => cache.match(event.request))
          .then(response => response || Promise.reject('Нет данных в кеше'));
      })
  );
});
