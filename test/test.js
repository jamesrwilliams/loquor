var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

const { parser } = require('../lib/parser');

describe('parser()', function () {

  describe('parse a simple HTML string correctly', function () {

    var testCase = "<p>Hello World</p>";
    var expected = [[3, 13]];
    var result = parser(testCase);

    it('should return 1 valid substring', function () {
      expect(result.length).to.equal(1);
    });

    it('should return the expected string indices', function () {
      expect(result).to.have.deep.members(expected);
    });

  });

  describe('parse a two part HTML string correctly (inc spaces)', function() {
    var testCase = "<p>Hello World</p> <span>Foo bar</span>";
    var expected = [[3, 13],[25, 31]];
    var result = parser(testCase);

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

  describe('should handle two matching text nodes correctly', function() {
    var testCase = "<p>One</p><p>Two</p>";
    var expected = [[3, 5], [13, 15]];
    var result = parser(testCase);

    it('should return a single result array', function () {
      expect(result.length).to.equal(2);
    });

    it('should return the expected string indices', function () {
      expect(result).to.have.deep.members(expected);
    });
  });

});
