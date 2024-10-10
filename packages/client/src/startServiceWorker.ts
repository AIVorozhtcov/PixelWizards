export default function startServiceWorker() {
  if (navigator.serviceWorker && import.meta.env.MODE === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('cacheServiceWorker.js', { scope: '/' })
        .then(() => console.info('[SW] register'))
        .catch(error => console.error('[SW] register failed: ', error));
    });
  }
}
