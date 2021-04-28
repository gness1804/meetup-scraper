/**
 * Extracts the number of days between today and a specified date in the past
 *
 * @param {string} dateStr  - the date to be compared against today. Example: 'Sun, Apr 25, 2021'
 * @returns {number | string} - returns an integer value for number of days since the specified date. Return string if invalid date computation or if value passed in is 'Not Recent'
 */

const extractDaysSince = (dateStr) => {
  if (dateStr === 'Not Recent') return dateStr;
  const now = new Date().getTime();
  const earlier = new Date(dateStr).getTime();
  if (isNaN(earlier)) return '';
  const ms = now - earlier;
  if (ms < 0) return '';
  // compute total number of days
  return Math.floor(ms / 1000 / 60 / 60 / 24);
};

module.exports = { extractDaysSince };
