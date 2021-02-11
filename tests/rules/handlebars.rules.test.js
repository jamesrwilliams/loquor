const chai = require('chai');
const expect = chai.expect;

const { handlebarsParser } = require('../../lib/rules/handlebars.rules');

describe('Rules: handlebarsParser()', () => {

  it('should ignore anything that is not handlebars syntax', () => {
    const testInput = '<p>Hello firstName</p>';

    const expectation = `0000000000000000000000`;
    const formatString = Array(testInput.length + 1).join('0');

    const result = handlebarsParser(testInput, formatString);
    expect(testInput.length).to.equal(formatString.length);

    expect(result).to.equal(expectation);

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

});
