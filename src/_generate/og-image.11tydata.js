export const eleventyComputed = {
  title: data => data.source.data.title,
  caption: data => data.source.data.content,
  hero: data => data.source.data.hero,
};
