/* global it, expect, describe */
const { extractDaysSince } = require('./extractDaysSince');

describe('extractDaysSince function', () => {
  it('should return null if there is not a valid date format passed in', () => {
    const res = extractDaysSince('Not Recent');
    expect(res).toEqual('Not Recent');
  });
});
