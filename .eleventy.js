require('dotenv').config();

const yaml = require('js-yaml');

const pluginWebc = require('@11ty/eleventy-plugin-webc');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const imgPlugin= require("./plugins/images");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'src/_components/**/*.webc',
    ],
  });

  eleventyConfig.addFilter('imgLink', (img) => {
    const slugify = eleventyConfig.getFilter('slugify');
    return `/data-men/${slugify(img.date)}/index.html`;
  });

  // Image plugin
  eleventyConfig.addPlugin(imgPlugin, {
    imgFolder: './assets/images/',
    output: {
      formats: ['avif', 'jpeg'],
      widths: [640, 960, 1600],
      urlPath: '/img/',
      outputDir: './_site/img/',
    },
    sizes: {
      default: '100vw',
    },
  });

  eleventyConfig.addPassthroughCopy({
    'assets/css': 'css',
  });

  eleventyConfig.setLiquidOptions({jsTruthy: true});
  eleventyConfig.addDataExtension('yml, yaml', (c) => yaml.load(c));
  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }

};
