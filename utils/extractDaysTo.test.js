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
});
