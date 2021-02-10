const chai = require('chai');
const expect = chai.expect;

const { parser } = require('../lib/parser');

describe('Ruleset: HTML', function() {

  describe('Ignore HTML entities', function() {
    const testCase = "foo bar&nsbp;";
    const expected = [[0,17]];
    const result = parser(testCase);

    it('should return 1 valid substring', function () {
      expect(result.length).to.equal(1);
    });

    it('should return the expected string indices', function () {
      expect(result).to.have.deep.members(expected);
    });

  });

  describe('HTML Structure', function() {

    describe('parse a simple HTML string correctly', function () {
      const testCase = "<p>Hello World</p>";
      const expected = [[3, 14]];
      const result = parser(testCase);

      it('should return 1 valid substring', function () {
        expect(result.length).to.equal(1);
      });

      it('should return the expected string indices', function () {
        expect(result).to.have.deep.members(expected);
      });

    });

    describe('parse a two part HTML string correctly (inc spaces)', function() {
      const testCase = "<p>Hello World</p> <span>Foo bar</span>";
      const expected = [[3, 14],[25, 32]];
      const result = parser(testCase);

      it('should return 2 valid substrings', function () {
        expect(result.length).to.equal(2);
      });

      it('should return the expected string indices', function () {
        expect(result).to.have.deep.members(expected);
      });
    });

    describe('should handle two matching text nodes correctly', function() {
      const testCase = '<p>One</p><p>Two</p>'
      const expected = [[3, 6], [13, 16]]
      const result = parser(testCase);

      it('should return a single result array', function () {
        expect(result.length).to.equal(2);
      });

      it('should return the expected string indices', function () {
        expect(result).to.have.deep.members(expected);
      });
    });

  });

});
