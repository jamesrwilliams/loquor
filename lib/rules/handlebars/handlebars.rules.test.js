const chai = require('chai');
const expect = chai.expect;

const { handlebarsParser } = require('./handlebars.rules.js');

describe('Syntax: Handlebars', () => {

  describe('handlebarsParser()', () => {

  it('should ignore anything that is not handlebars syntax', () => {
    const testInput = '<p>Hello firstName</p>';

    const expectation = `0000000000000000000000`;
    const formatString = Array(testInput.length + 1).join('0');

    const result = handlebarsParser(testInput, formatString);
    expect(testInput.length).to.equal(formatString.length);

    expect(result).to.equal(expectation);

  });

  it('passes through the formatting string if nothing needs changing', () => {
    const testCase = "<p>Hello World</p>";
    const expected = '111000000000000111';
    const result = handlebarsParser(testCase, expected);

    expect(result).to.equal(expected);
  });

  it('should replace the substring with one marker', () => {

    const testInput = '<p>Hello { firstName }</p>';

    const expectation = `00000000011111111111110000`;
    const formatString = Array(testInput.length + 1).join('0');

    const result = handlebarsParser(testInput, formatString);
    expect(testInput.length).to.equal(formatString.length);

    expect(result).to.equal(expectation);

  });

  it('should replace the substring with two markers', () => {

    const testInput = '<p>Hello { firstName } { lastname }</p>';

    const expectation = `000000000111111111111101111111111110000`;
    const formatString = Array(testInput.length + 1).join('0');

    const result = handlebarsParser(testInput, formatString);
    expect(testInput.length).to.equal(formatString.length);

    expect(result).to.equal(expectation);

  });

  it('should correctly select strings with formatters', () => {
    const testInput   = '<p>Hello world! Your balance is {limitRemaining, number}</p>';
    const formatString = Array(testInput.length + 1).join('0');
    const expectation = `000000000000000000000000000000001111111111111111111111110000`;

    const result = handlebarsParser(testInput, formatString);
    expect(testInput.length).to.equal(formatString.length);

    expect(result).to.equal(expectation);
  });

  // it('should with complex nested versions', () => {
  //   const testCase = `{quantity, plural, one {%lp.currency.name%} other{%lp.currency.name.plural%}}`;
  //   const expected = `11111111111111111111111111111111111111111111111111111111111111111111111111111`;
  //   const formatString = Array(testCase.length + 1).join('0');
  //   const result = handlebarsParser(testCase, formatString);
  //
  //   expect(testCase.length).to.equal(formatString.length);
  //   expect(result).to.equal(expected);
  // });

});

});
