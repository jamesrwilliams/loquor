const chai = require('chai');
const expect = chai.expect;
const { core } = require('./core');

describe('core()', () => {
  it('works with an empty string', () => {
    const testCase = '';
    const result = core(testCase);

    expect(result).is.an('array');

  });

  it('Plaintext string', () => {
    const testCase = 'Hello world';
    const result = core(testCase);

    expect(result).is.an('array');
    expect(result.length).to.equal(0);
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = core(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3],[14, 17]])
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = core(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3],[14, 17]])
  });

  it('complex example', () => {
    const testCase = '<p><strong>Hello %firstName%</strong>welcome to {status} Fly World&#x2120;</p>';
    const expected = '111111111110000001111111111111111111100000000000111111110000000000111111111111';
    const result = core(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(4);
    expect(result).to.deep.eq([[0, 11], [17,37], [48,56], [66,77]]);
  });

});
