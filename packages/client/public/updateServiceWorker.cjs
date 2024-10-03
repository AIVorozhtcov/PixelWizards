const fs = require('fs');

const BUILD_FOLDER = 'dist';
const SW_FILE = 'cacheServiceWorker.js';
const FILE_EXEPTION = 'updateServiceWorker.cjs';

fs.readFile(`${BUILD_FOLDER}/${SW_FILE}`, 'utf-8', (err, data) => {
  const filesUrls = getAllFilesInDir(`./${BUILD_FOLDER}`);
  const urlsForCache = data.replace('%FILESURLS%', filesUrls);

  fs.writeFile(`${BUILD_FOLDER}/${SW_FILE}`, urlsForCache, error => {
    if (error) {
      console.error(`Ошибка при добавлении файлов в service worker: ${error}`);
    } else {
      console.info('Файлы в service worker добавлены');
    }
  });
});

function getAllFilesInDir(dirPath, files) {
  const filesAndDirs = fs.readdirSync(dirPath);
  files = files || [];

  filesAndDirs.forEach(file => {
    const pathName = `${dirPath}/${file}`;

    if (fs.statSync(pathName).isDirectory()) {
      files = getAllFilesInDir(pathName, files);
    } else {
      const pathNameForCache = pathName.replace(`./${BUILD_FOLDER}`, '');
      files.push(pathNameForCache);
    }
  });

  return files.filter(
    file => !file.includes(FILE_EXEPTION) && !file.includes(SW_FILE)
  );
}
