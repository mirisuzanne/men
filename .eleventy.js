import 'dotenv/config';

import { load } from 'js-yaml';

import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import { eleventyImagePlugin } from '@11ty/eleventy-img';

// import imgPlugin from "./plugins/images.js";
import timePlugin from "./plugins/time.js";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      'src/_components/**/*.webc',
      'npm:@11ty/eleventy-img/*.webc',
    ],
  });

  eleventyConfig.addFilter('imgLink', (img) => {
    const slugify = eleventyConfig.getFilter('slugify');
    return `/data-men/${slugify(img.date)}/index.html`;
  });

  // Plugins
  eleventyConfig.addPlugin(timePlugin);
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["avif", "jpeg"],
		urlPath: "/img/",
    widths: [640, 960, 1600],

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

  eleventyConfig.addPassthroughCopy('src/css');

  eleventyConfig.setLiquidOptions({jsTruthy: true});
  eleventyConfig.addDataExtension('yml, yaml', (c) => load(c));
  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }

};
