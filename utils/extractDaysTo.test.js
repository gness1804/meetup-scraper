/* global it, expect, describe */
const { extractDaysTo } = require('./extractDaysTo');

describe('extractDaysTo function', () => {
  it('should return null if there is not a valid date format passed in', () => {
    const res = extractDaysTo('Not Recent');
    expect(res).toEqual('Not Recent');
  });

  it('should return empty string if invalid date value passed in', () => {
    const res = extractDaysTo('Gibberish');
    expect(res).toEqual('');
  });

  it('should return a positive integer for a date later than today', () => {
    const res = extractDaysTo('Sat, Dec 25, 2021');
    expect(!isNaN(res) && res > 0).toBe(true);
  });

  it('should return an empty string for a date earlier than today', () => {
    const res = extractDaysTo('Mon, Apr 26, 2021');
    expect(res).toEqual('');
  });
});
