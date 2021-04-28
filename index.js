require('dotenv').config();
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const path = require('path');
const prettier = require('prettier');
const { extractDaysSince } = require('./utils/extractDaysSince');
const { extractDaysTo } = require('./utils/extractDaysTo');
const { extractFullDate } = require('./utils/extractFullDate');
const { writeFile } = require('fs').promises;

const [, , query, maxResults = 5] = process.argv;
const filePath = path.resolve(__dirname, './data');

if (!query)
  throw new Error('Error: query argument required. Example: "tennis".');

// TODO: make city and state dynamic via inputs
const url = `https://www.meetup.com/find/?allMeetups=false&keywords=${query}&radius=50&userFreeform=Austin%2C+TX&mcId=z73301&mcName=Austin%2C+TX&sort=recommended&eventFilter=all`;

(async () => {
  let html;
  /* eslint-disable-next-line no-console */
  console.info('Retrieving data from Meetup...');
  const startTime = Date.now();
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

  // TODO: handle case with no links

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
    let daysSinceMostRecentPastEvent = null;
    let soonestUpcomingEvent = null;
    let daysUntilSoonestUpcomingEvent = null;

    const pastEventsArr = _$(
      '.groupHome-eventsList-pastEvents .eventTimeDisplay-startDate span',
    );
    if (pastEventsArr && pastEventsArr[0] && pastEventsArr[0].firstChild) {
      mostRecentPastEvent = pastEventsArr[0].firstChild.data;
    }

    if (mostRecentPastEvent)
      mostRecentPastEvent = extractFullDate(mostRecentPastEvent);

    if (mostRecentPastEvent && new Date(mostRecentPastEvent)) {
      daysSinceMostRecentPastEvent = extractDaysSince(mostRecentPastEvent);
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

    if (soonestUpcomingEvent)
      soonestUpcomingEvent = extractFullDate(soonestUpcomingEvent);

    if (soonestUpcomingEvent && new Date(soonestUpcomingEvent)) {
      daysUntilSoonestUpcomingEvent = extractDaysTo(soonestUpcomingEvent);
    }

    const descriptionArr = _$('.group-description').text().split(' ');
    const maxLen = 150;
    const description = `${descriptionArr.slice(0, maxLen).join(' ')}${
      descriptionArr.length > maxLen ? '...' : ''
    }`;

    if (!title) {
      res.push(null);
      continue;
    }

    res.push({
      title,
      'Total Members': membersCount || 'Not Listed',
      'Upcoming Events Displayed': upcomingEventsDisplayedCount || 'Not Listed',
      'Past Events Displayed': pastEventsDisplayedCount || 'Not Listed',
      'Most Recent Past Event': mostRecentPastEvent || 'Not Listed',
      'Days Since Most Recent Past Event':
        daysSinceMostRecentPastEvent || 'Not Available',
      'Days Until Soonest Upcoming Event':
        daysUntilSoonestUpcomingEvent || 'Not Available',
      'Soonest Upcoming Event': soonestUpcomingEvent || 'Not Listed',
      description: description || 'Not Listed',
    });
  }

  const resolvedRes = res.filter((x) => x);

  const fileName = `${filePath}/${query}.json`;

  if (!resolvedRes.length) {
    /* eslint-disable-next-line no-console */
    console.info(
      `Your query for ${query} did not return any results. Please try again with another query.`,
    );
    process.exit(0);
  }

  const prettifiedRes = prettier.format(JSON.stringify(resolvedRes), {
    parser: 'json',
  });

  await writeFile(fileName, prettifiedRes);

  //eslint-disable-next-line no-console
  console.info(`Successfully created ${fileName}.`);
  const endTime = Date.now() - startTime;
  //eslint-disable-next-line no-console
  console.info(`Data operation completed in ${endTime / 1000} seconds.`);
})();
