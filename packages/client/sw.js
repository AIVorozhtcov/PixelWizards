const CACHE_NAME = 'capybara-game-cache-v1';

const URLS = [
  'index.html',
];

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS))
      .catch(error => console.log(error))
  );

  event.waitUntil(this.skipWaiting());
});

this.addEventListener('fetch', event => {
  event.respondWith(
    // Пытаемся получить данные с помощью запроса по сети 
    fetch(event.request)
      .then(response => {
        // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш 
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Если запрос прошел успешно, обновляем кэш
        const cloneResponse = response.clone();

        caches
          .open(CACHE_NAME)
          .then(cache => {
            if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
              cache.put(event.request, cloneResponse);
            }
          });

        return response;
      })
      .catch(error => {
        // Если запрос по сети не прошел, находим нужный кэш и возвращаем его
        caches
          .match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
          })

        console.log('Нет данных в кэше', error);
      })
  );
});

this.addEventListener('activate', event => {
  event.waitUntil(this.clients.claim());
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

