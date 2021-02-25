const chai = require('chai');

const { expect } = chai;
const { encodedToIndex } = require('./encodedToIndex');

describe('encodedToIndex()', () => {
  it('works with an empty string', () => {
    const testCase = '';
    const result = encodedToIndex(testCase);

    expect(result).is.an('array');
  });

  it('Plaintext string', () => {
    const testCase = 'Hello world';
    const result = encodedToIndex(testCase);

    expect(result).is.an('array');
    expect(result.length).to.equal(0);
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = encodedToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3], [14, 17]]);
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = encodedToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3], [14, 17]]);
  });

  it('twig only string', () => {
    const testCase = '%lp.currency.name.plural%';
    const result = encodedToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 25]]);
  });

  it('complex example', () => {
    const testCase = '111111111110000001111111111111111111100000000000111111110000000000111111111111';
    const result = encodedToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(4);
    expect(result).to.deep.eq([[0, 11], [17, 37], [48, 56], [66, 77]]);
  });

  it('long complex example', () => {
    const testCase = '1110000000000000000000000000000000000000000000000000000000011111110000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000001111000000001111111111111111111111111111111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000011111111111111111111111111111111111000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000000001111111111111111111111111111111111101111';
    const expected = [
      [0, 3],
      [59, 66],
      [73, 203],
      [213, 217],
      [225, 260],
      [265, 396],
      [406, 410],
      [419, 454],
      [459, 594],
      [604, 608],
      [621, 656],
      [657, 661],
    ];
    const result = encodedToIndex(testCase);

    expect(result).to.deep.eq(expected);
  });
});
