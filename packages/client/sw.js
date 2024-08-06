const CACHE_NAME = 'capybara-game-cache-v1';

const URLS = [
  '/',
  '/src/pages/Home.tsx',
  '/src/pages/Profile.tsx',
];

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return (
          fetch(fetchRequest)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
                    cache.put(event.request, responseToCache);
                  }
                });

              return response;
            })
        );
      })
  );
});

this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  );
});

