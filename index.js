require('dotenv').config();
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const path = require('path');
const prettier = require('prettier');
const { writeFile } = require('fs').promises;

const [, , query, maxResults = 5] = process.argv;
const filePath = path.resolve(__dirname, './data');

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
  const res = [];

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
    const membersCount =
      _html && _html.match(/Members \(\d+/)
        ? parseInt(_html.match(/Members \(\d+/)[0].replace(/\D/g, ''), 10)
        : '';
    const upcomingEventsDisplayedCount = _$(
      '.groupHome-eventsList-upcomingEvents .eventCard--link',
    ).length;
    const pastEventsDisplayedCount = _$(
      '.groupHome-eventsList-pastEvents .eventCard--link',
    ).length;

    let mostRecentPastEvent = null;
    let soonestUpcomingEvent = null;

    const pastEventsArr = _$(
      '.groupHome-eventsList-pastEvents .eventTimeDisplay-startDate span',
    );
    if (pastEventsArr && pastEventsArr[0] && pastEventsArr[0].firstChild) {
      mostRecentPastEvent = pastEventsArr[0].firstChild.data;
    }

    const upcomingEventsArr = _$(
      '.groupHome-eventsList-upcomingEvents .eventTimeDisplay-startDate span',
    );
    if (
      upcomingEventsArr &&
      upcomingEventsArr[0] &&
      upcomingEventsArr[0].firstChild
    ) {
      soonestUpcomingEvent = upcomingEventsArr[0].firstChild.data;
    }

    const descriptionArr = _$('.group-description').text().split(' ');
    const maxLen = 150;
    const description = `${descriptionArr.slice(0, maxLen).join(' ')}${
      descriptionArr.length > maxLen ? '...' : ''
    }`;

    res.push({
      title,
      'Total Members': membersCount,
      'Upcoming Events Displayed': upcomingEventsDisplayedCount,
      'Past Events Displayed': pastEventsDisplayedCount,
      'Most Recent Past Event': mostRecentPastEvent || 'Not Listed',
      'Soonest Upcoming Event': soonestUpcomingEvent || 'Not Listed',
      description,
    });
  }

  const fileName = `${filePath}/${query}.json`;

  const prettifiedRes = prettier.format(JSON.stringify(res), {
    parser: 'json',
  });

  await writeFile(fileName, prettifiedRes);

  //eslint-disable-next-line no-console
  console.info(`Successfully created ${fileName}.`);
})();
