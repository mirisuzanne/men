const asDate = (date) => {
  const days = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  ];
  const months = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
  ];

  const year = date.getUTCFullYear();
  const month = months[date.getUTCMonth()];
  const mDay = date.getUTCDate();
  const wDay = days[date.getUTCDay()];

  return `${wDay} ${month} ${mDay}, ${year}`;
};

export default function(eleventyConfig) {
  eleventyConfig.addAsyncFilter('asDate', asDate);
}

