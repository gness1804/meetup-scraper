/* global it, expect, describe */
const { extractDaysSince } = require('./extractDaysSince');

describe('extractDaysSince function', () => {
  it('should return null if there is not a valid date format passed in', () => {
    const res = extractDaysSince('Not Recent');
    expect(res).toEqual('Not Recent');
  });

  it('should return empty string if invalid date value passed in', () => {
    const res = extractDaysSince('Gibberish');
    expect(res).toEqual('');
  });

  it('should return a positive integer for a date earlier than today', () => {
    const res = extractDaysSince('Wed, Mar 3, 2021');
    expect(!isNaN(res) && res > 0).toBe(true);
  });

  it('should return an empty string for a date later than today', () => {
    const res = extractDaysSince('Sat, Dec 25, 2021');
    expect(res).toEqual('');
  });
});
