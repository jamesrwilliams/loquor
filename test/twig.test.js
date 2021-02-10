const chai = require('chai');
const expect = chai.expect;

const { parser } = require('../lib/parser');

describe('Ruleset: Twig', function () {

  describe('parse merge tokens using "%" correctly', function() {

      const testCase = "Please enter how many %lp.currency.name.plural% you want to extend.";
      const expected = [[22, 47]];
      const result = parser(testCase);

      it('should return a single result array', function () {
        expect(result.length).to.equal(1);
      });

      it('should return the expected string indices', function () {
        expect(result).to.have.deep.members(expected);
      });
  });

});
