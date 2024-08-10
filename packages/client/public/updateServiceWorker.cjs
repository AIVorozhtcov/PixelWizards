const fs = require('fs');
const assetManifest = require('./manifest.json');

const urls = Object.values(assetManifest).map(data => data.file);

fs.readFile('dist/cacheServiceWorker.js', 'utf-8', (err, data) => {
  const urlsWithHash = data.replace('%HASHURLS%', urls);

  fs.writeFile('dist/cacheServiceWorker.js', urlsWithHash, (error) => {
    error ? console.log(`Ошибка при добавлении файлов манифеста: ${error}`) : console.log(`Файлы из манифеста добавлены`);
  });
});
