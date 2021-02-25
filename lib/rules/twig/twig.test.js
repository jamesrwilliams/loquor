const { expect } = require('chai');
const { twigParser } = require('./twig.rules');

describe('Syntax: Twig', () => {
  describe('twigParser()', () => {
    it('should parse merge tokens using "%" correctly', () => {
      const testCase = 'Please enter how many %lp.currency.name.plural% you want to extend.';
      const expected = '0000000000000000000000111111111111111111111111100000000000000000000';
      const result = twigParser(testCase, expected);

      expect(result).to.equal(expected);
    });

    it('passes through the formatting string if nothing needs changing', () => {
      const testCase = '<p>Hello World</p>';
      const expected = '111000000000000111';
      const result = twigParser(testCase, expected);

      expect(result).to.equal(expected);
    });

    it('validates a twig only string correctly', () => {
      const testCase = '%lp.currency.name.plural%';
      const expected = '1111111111111111111111111';
      const result = twigParser(testCase, expected);

      expect(result).to.equal(expected);
    });
  });
});
