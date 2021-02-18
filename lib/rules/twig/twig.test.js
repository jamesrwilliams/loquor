const { twigParser } = require('./twig.rules');
const expect = require('chai').expect;

describe('Syntax: Twig', function () {

  describe('twigParser()', () => {
    it('should parse merge tokens using "%" correctly', function() {

      const testCase = "Please enter how many %lp.currency.name.plural% you want to extend.";
      const expected = "0000000000000000000000111111111111111111111111100000000000000000000";
      const result = twigParser(testCase, expected);

      expect(result).to.equal(expected);
    });
  });

});
