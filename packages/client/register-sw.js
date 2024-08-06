function startServiceWorker() {
  if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/'})
        .then(() => console.log('[SW] register'))
        .catch(error => console.log('[SW] register failed: ', error));
    });
  }
}

startServiceWorker();
