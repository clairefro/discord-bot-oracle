const axios = require('axios');
const cheerio = require('cheerio');

// Returns a cheerio object
module.exports = async function fetchCheerio(url) {
  const { data } = await axios.get(url).catch((e) => console.error(e));
  return cheerio.load(data);
};
