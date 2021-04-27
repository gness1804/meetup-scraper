/* global it, expect, describe */
const { extractFullDate } = require('./extractFullDate');

describe('extractFullDate function', () => {
  it('returns null for an invalid date format', () => {
    const res = extractFullDate('Wed Mar 3 2021');
    expect(res).toEqual(null);
  });

  it('returns the correct full date for a valid date entry (2021)', () => {
    const res = extractFullDate('Mon, Apr 26');
    expect(res).toEqual('Mon, Apr 26, 2021');
  });

  it('returns the correct full date for a valid date entry (2020)', () => {
    const res = extractFullDate('Thu, May 7');
    expect(res).toEqual('Thu, May 7, 2020');
  });

  it("returns 'Not Recent' for a date before 2020", () => {
    // a date from 2019
    const res = extractFullDate('Sun, Aug 4');
    expect(res).toEqual('Not Recent');
  });
});
