const chai = require('chai');
const expect = chai.expect;

const { parser } = require('../lib/parser');

describe('Ruleset: Plaintext', () => {

  describe('parse should correct respond to an empty string', function() {
    const testCase = "";
    const result = parser(testCase);

    it('should return an empty array', function () {
      expect(result).to.be.empty;
    });
  });

  describe('ignore a relative URL string', function() {

    var testCase = "/static/emirates-skywards/dist/latest/images/Inline_Logo_US.svg";
    var expected = [];
    var result = parser(testCase);

    it('should return an empty array', function () {
      expect(result.length).to.equal(0);
    });

    it('should return the expected string indices', function () {
      expect(result).to.have.deep.members(expected);
    });
  });

});
