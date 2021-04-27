const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Extracts a full date for a date string without a year. If before 2020, returns a 'Not Recent' string.
 *
 * @param {string} dateStr - The date string. Example: 'Mon, Apr 26'
 * @returns {string | null} - returns the date string with the year, 'Not Recent', or null.
 */

const extractFullDate = (dateStr) => {
  let dayOfWeek, month, date;
  const vals = dateStr.match(/^(\w{3}), ([A-Z][a-z]{2}) (\d{1,2})/);

  if (vals) {
    [, dayOfWeek, month, date] = vals;
  } else {
    return null;
  }

  const monthVal = `0${months[month]}`;
  const dateVal = date.toString().length === 1 ? `0${date}` : date;

  if (dayOfWeek && month && date) {
    let day = days[new Date(`2021-${monthVal}-${dateVal}T00:00`).getDay()];
    // check if day of the week in dateVal matches dayOfWeek
    if (day === dayOfWeek) return `${dateStr}, 2021`;

    // no matching date in 2021; check 2020
    day = days[new Date(`2020-${monthVal}-${dateVal}T00:00`).getDay()];
    // check if day of the week in dateVal matches dayOfWeek
    if (day === dayOfWeek) return `${dateStr}, 2020`;
    // date is not in either 2020 or 2021
    return 'Not Recent';
  }
  return null;
};

module.exports = { extractFullDate };
