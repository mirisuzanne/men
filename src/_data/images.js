const path = require('path');
const fsPromises = require('fs/promises');
const slugify = require('slugify');

const filePath = path.resolve(__dirname, '../../.frontmatter/database/mediaDb.json');
const ready = '-@-';

const imgData = async () => {
  try {
    // Get the content of the JSON file
    const data = await fsPromises.readFile(filePath);

    // Turn it to an object
    const imageJson = JSON.parse(data).assets.images;

    const imageData = Object.keys(imageJson)
      .filter((url) => url.includes(ready))
      .map((url) => {
        const img = imageJson[url];
        img.url = url;
        img.draft = url.includes('draft');
        img.date = url
          .split(ready).at(-1)
          .split('.').at(0);
        img.permalink = `${slugify(img.date)}/${slugify(img.title.toLowerCase())}`;
        return img;
      })
      .sort((a, b) => a.date - b.date);

      return imageData;
  } catch (err){
    console.log(err);
  }
}

module.exports = imgData();
