import { exec } from 'node:child_process';
import { log } from 'node:console';
import { writeFile, readdir } from 'node:fs/promises';

const imageFolder = './src/men/';

const sortImages = exec(
  `exiftool -d '%Y/%Y-%m-%dT%H%M%%-03.c.%%e' '-filename<CreateDate' .`,
  {cwd: imageFolder},
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);
await new Promise( (resolve) => { sortImages.on('close', resolve) });

const getLink = (path) => {
  return path.slice(0, path.lastIndexOf('.'));
}

const getName = (path) => {
  return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
}

const getDate = (path) => {
  return path.slice(path.indexOf('/') + 1, path.indexOf('T'));
}

const files = await readdir(imageFolder, {recursive: true});

const images = files
  .filter((path) => {
    const ext = path.split('.').at(-1);
    return ['jpg', 'jpeg', 'webp', 'avif'].includes(ext);
  })
  .map((path) => {
    const img = { path };
    img.link = getLink(path);
    img.name = getName(path);
    img.date = getDate(path);

    return img;
  });

images.forEach((img) => {
  const srcFileName = `${img.link}.webc`;
  if (files.includes(srcFileName)) { return; }

  writeFile(
    `${imageFolder}/${srcFileName}`,
    `---
date: ${img.date}
title: ${img.name}
hero: ${img.path}

# briefly describe the image…
alt: ''

# insert the closed caption text after the three-dash break…
# (include line-breaks, punctuation, and capitalization)
---`);
});
