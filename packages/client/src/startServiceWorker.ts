export default function startServiceWorker() {
  if (navigator.serviceWorker && import.meta.env.MODE === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('cacheServiceWorker.js', { scope: '/' })
        .then(() => console.log('[SW] register'))
        .catch(error => console.log('[SW] register failed: ', error));
    });
  }
}
