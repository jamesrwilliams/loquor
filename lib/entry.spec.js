const chai = require('chai');

const { expect } = chai;
const { entry } = require('./entry');

describe('Entry', () => {
  it('Integration 1', () => {
    const testCase = '';
    const expected = [];
    const result = entry(testCase);
    expect(result).to.eq(expected);
  });
});
