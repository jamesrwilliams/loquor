const chai = require('chai');

const { expect } = chai;
const { replaceBetween } = require('./replaceBetween');

describe('Utility: replaceBetween()', () => {
  it('should exist', () => {
    expect(replaceBetween.name).to.equal('replaceBetween');
  });

  it('not do anything if the indices are zero', () => {
    const result = replaceBetween('0000000', 0, 0);
    expect(result).to.equal('0000000');
  });

  it('Format a single character correctly', () => {
    const result = replaceBetween('0000000', 0, 1);
    expect(result).to.equal('1000000');
  });

  it('Handle formatting the last index', () => {
    const result = replaceBetween('0000000', 6, 7);
    expect(result).to.equal('0000001');
  });

  it('error correctly if the range is incorrect', () => {
    const result = replaceBetween('0000000', 0, 8);
    expect(result).to.equal('0000000');
  });

  it('format the entire string', () => {
    const result = replaceBetween('0000000', 0, 7);
    expect(result).to.equal('1111111');
  });
});
