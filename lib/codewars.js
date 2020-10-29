const fetchCheerio = require('../utils/fetchCheerio');

const KATA_SEARCH_ENDPOINT =
  'https://www.codewars.com/kata/search/javascript/?beta=false';
const KATA_BASE_URL = 'https://www.codewars.com/kata/';

const $ = await fetchCheerio(KATA_SEARCH_ENDPOINT);

const kataId = $('div[class=kata]').attr('id');

async function fetchCheerio(url) {
  const { data } = await axios.get(url).catch((e) => console.error(e));
  return cheerio.load(data);
}
