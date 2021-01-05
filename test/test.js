const chai = require('chai');
const expect = chai.expect;

const { parser } = require('../lib/parser');

describe('parser()', function () {

  describe('parse should correct respond to an empty string', function() {
    const testCase = "";
    const result = parser(testCase);

    it('should return an empty array', function () {
      expect(result).to.be.empty;
    });
  });

  describe('parse should correct respond to an empty string', function() {
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

  // describe('ignore a relative URL string', function() {
  //
  //   var testCase = "/static/emirates-skywards/dist/latest/images/Inline_Logo_US.svg";
  //   var expected = [];
  //   var result = parser(testCase);
  //
  //   it('should return an empty array', function () {
  //     expect(result.length).to.equal(0);
  //   });
  //
  //   it('should return the expected string indices', function () {
  //     expect(result).to.have.deep.members(expected);
  //   });
  // });
  //
  // describe('parse merge tokens using "%" correctly', function() {
  //
  //     var testCase = "Please enter how many %lp.currency.name.plural% you want to extend.";
  //     var expected = [[22, 47]];
  //     var result = parser(testCase);
  //
  //     it('should return a single result array', function () {
  //       expect(result.length).to.equal(1);
  //     });
  //
  //     it('should return the expected string indices', function () {
  //       expect(result).to.have.deep.members(expected);
  //     });
  // });
  // describe('handle HTML entities correctly', function() {
  //
  //   var testCase = "Hello&nbsp;World";
  //   var expected = [];
  //   var result = parser(testCase);
  //
  //   it('should return an empty array', function () {
  //     expect(result.length).to.equal(0);
  //   });
  //
  //   it('should return the expected string indices', function () {
  //     expect(result).to.have.deep.members(expected);
  //   });
  // });

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
