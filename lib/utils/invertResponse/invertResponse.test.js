const chai = require('chai');
const expect = chai.expect;
const { invertResponse } = require('./invertResponse');

describe('Utility: invertResponse()', () => {
  it('should exist', () => {
    expect(invertResponse.name).to.equal('invertResponse');
  });

  it('should do nothing to an empty string', () => {
    const testCase = '';
    const expected = '';
    const result = invertResponse(testCase);

    expect(result).to.equal(expected);
  });

  it('should invert a string correctly', () => {
    const testCase = '0101010101010101';
    const expected = '1010101010101010';
    const result = invertResponse(testCase);

    expect(result).to.equal(expected);
  });

  it('should invert a string correctly (all)', () => {
    const testCase = '1111111111111111';
    const expected = '0000000000000000';
    const result = invertResponse(testCase);

    expect(result).to.equal(expected);
  });

});
