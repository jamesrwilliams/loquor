const chai = require('chai');
const expect = chai.expect;
const { encodeToIndex } = require('./encodedToIndex');

describe('encodeToIndex()', () => {
  it('works with an empty string', () => {
    const testCase = '';
    const result = encodeToIndex(testCase);

    expect(result).is.an('array');

  });

  it('Plaintext string', () => {
    const testCase = 'Hello world';
    const result = encodeToIndex(testCase);

    expect(result).is.an('array');
    expect(result.length).to.equal(0);
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = encodeToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3],[14, 17]])
  });

  it('maps html', () => {
    const testCase = '<p>Hello world</p>';
    const result = encodeToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 3],[14, 17]])
  });

  it('twig only string', () => {
    const testCase = '%lp.currency.name.plural%';
    const result = encodeToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(2);
    expect(result).to.deep.eq([[0, 25]])
  });

  it('complex example', () => {
    const testCase = '<p><strong>Hello %firstName%</strong>welcome to {status} Fly World&#x2120;</p>';
    const expected = '111111111110000001111111111111111111100000000000111111110000000000111111111111';
    const result = encodeToIndex(testCase);
    expect(result).is.an('array');
    expect(result.length).to.equal(4);
    expect(result).to.deep.eq([[0, 11], [17,37], [48,56], [66,77]]);
  });

  it('long complex example', () => {
    const testCase = `<p>We're sorry, something went wrong with your transaction.</p><p>Please <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-buy">click here</a> to buy %lp.currency.name.lowerCase.plural%, or <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-gift">click here</a> to give %lp.currency.name.lowerCase.plural%, or <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-transfer">click here</a> to transfer %lp.currency.name.lowerCase.plural%.</p>`;
    const expected = `1110000000000000000000000000000000000000000000000000000000011111110000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000001111000000001111111111111111111111111111111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000011111111111111111111111111111111111000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000000001111111111111111111111111111111111101111`;
    const result = encodeToIndex(testCase);

    const expectedOutput = [[0,3],[59,66],[73,203],[213,217],[225,260],[265,396],[406,410],[419,454],[459,594],[604,608],[621,656],[657,660]];

    expect(result).to.deep.eq(expectedOutput);
  })

});
