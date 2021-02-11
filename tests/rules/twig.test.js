const chai = require('chai');
const expect = chai.expect;

const { twigParser } = require('../../lib/rules/twig.rules');

describe('Rules: twigParser()', function () {

  describe('parse merge tokens using "%" correctly', function() {

      const testCase = "Please enter how many %lp.currency.name.plural% you want to extend.";
      const expected = [[22, 47]];
      const result = twigParser(testCase);

      it('should return a single result array', function () {
        expect(result.length).to.equal(1);
      });

      it('should return the expected string indices', function () {
        expect(result).to.have.deep.members(expected);
      });
  });

});
