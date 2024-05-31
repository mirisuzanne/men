import { readdir } from 'node:fs/promises';

const imageFolder = './src/men/';

const imgData = async () => {
  try {
    const files = await readdir(imageFolder, {recursive: true});

    const getName = (path) => {
      return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    }

    const getDate = (path) => {
      return path.slice(path.indexOf('/') + 1, path.indexOf('T'));
    }

    const pages = files
      .filter((path) => {
        const ext = path.split('.').at(-1);
        return ['jpg', 'jpeg', 'webp', 'avif'].includes(ext);
      })
      .map((path) => {
        const img = { path };
        img.name = getName(path);
        img.date = getDate(path);

        return img;
      })
      .sort((a, b) => a.date - b.date);

    return pages;
  } catch (err){
    console.log(err);
  }
}

export default imgData();
