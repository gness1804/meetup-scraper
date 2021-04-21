require('dotenv').config();
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { writeFile } = require('fs').promises;

const [, , query] = process.argv;

if (!query) throw new Error('Error: query argument required. Example: "tennis".');

// TODO: make city and state dynamic via inputs
const url = `https://www.meetup.com/find/?allMeetups=false&keywords=${query}&radius=50&userFreeform=Austin%2C+TX&mcId=z73301&mcName=Austin%2C+TX&sort=recommended&eventFilter=all`;

(async () => {
  let html;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(`Failed to retrieve recipe: ${error}.`);
    process.exit(1);
  }

  const $ = cheerio.load(html);

  const links = $('.groupCard--photo');
  links.each(async (i, link) => {
    const { href } = link.attribs;
  })
}
)()
