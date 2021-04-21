require('dotenv').config();
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { writeFile } = require('fs').promises;

const [, , query, maxResults = 5] = process.argv;
const filePath = __dirname;

if (!query)
  throw new Error('Error: query argument required. Example: "tennis".');

// TODO: make city and state dynamic via inputs
const url = `https://www.meetup.com/find/?allMeetups=false&keywords=${query}&radius=50&userFreeform=Austin%2C+TX&mcId=z73301&mcName=Austin%2C+TX&sort=recommended&eventFilter=all`;

(async () => {
  let html;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(`Failed to retrieve meetups: ${error}.`);
    process.exit(1);
  }

  const $ = cheerio.load(html);
  let linksArr = [];
  let mainText = '';

  const links = $('.groupCard--photo');
  links.each((i, link) => {
    const { href } = link.attribs;
    linksArr.push(href);
  });

  for (const link of linksArr.slice(0, maxResults)) {
    let _html;
    try {
      const res = await fetch(link);
      _html = await res.text();
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(`Failed to retrieve meetup page: ${error}.`);
      process.exit(1);
    }

    const _$ = cheerio.load(_html);
    const title = _$('h1 a').text();
    const description = _$('.group-description')
      .text()
      .split(' ')
      .slice(0, 150)
      .join(' ');

    mainText += `
        ${title}
        ${description}
        \n
      `;
  }

  const fileName = `${filePath}/${query}.txt`;

  await writeFile(fileName, mainText);
  //eslint-disable-next-line no-console
  console.info(`Successfully created ${fileName}.`);
})();
