const chai = require('chai');

const { expect } = chai;
const { encodeValue } = require('./encodeValue');

describe('Utility: encodeValue()', () => {
  it('works with an empty string', () => {
    const testCase = '';
    const expected = '';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });

  it('Plaintext string', () => {
    const testCase = 'Hello world';
    const expected = '00000000000';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });

  it('validates HTML only', () => {
    const testCase = '<p>Hello world</p>';
    const expected = '111000000000001111';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });

  it('twig only string', () => {
    const testCase = '%lp.currency.name.plural%';
    const expected = '1111111111111111111111111';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });

  it('complex example', () => {
    const testCase = '<p><strong>Hello %firstName%</strong>welcome to {status} Fly World&#x2120;</p>';
    const expected = '111111111110000001111111111111111111100000000000111111110000000000111111111111';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });

  it('long complex example', () => {
    const testCase = '<p>We\'re sorry, something went wrong with your transaction.</p><p>Please <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-buy">click here</a> to buy %lp.currency.name.lowerCase.plural%, or <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-gift">click here</a> to give %lp.currency.name.lowerCase.plural%, or <a href="https://www.qatarairways.com/en/Privilege-Club/postLogin/dashboardqrpcuser/my-services/my-services-bgt.html#poi-tab-transfer">click here</a> to transfer %lp.currency.name.lowerCase.plural%.</p>';
    const expected = '1110000000000000000000000000000000000000000000000000000000011111110000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000001111000000001111111111111111111111111111111111100000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000011111111111111111111111111111111111000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110000000000111100000000000001111111111111111111111111111111111101111';
    const result = encodeValue(testCase);
    expect(result).to.equal(expected);
  });
});
