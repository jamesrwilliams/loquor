const chai = require('chai');
const expect = chai.expect;

const { htmlTagsParser, htmlEntitiesParser } = require('../../lib/rules/html.rules');

describe('Syntax: HTML', function() {

  describe('htmlEntitiesParser()', function() {

    it('should mark HTML entities', function () {

      const testCase = 'foo bar&nsbp;';
      const expected = '0000000111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlEntitiesParser(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    it('should mark multiple HTML entities', function () {

      const testCase = '&lt;testdata&gt;';
      const expected = '1111000000001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlEntitiesParser(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

  });

  describe('Rules: htmlTagsParser()', function() {

    it('should mark a basic HTML tags', function () {
      const testCase = "<p>Hello World</p>";
      const expected = '111000000000001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlTagsParser(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    it('parse a two part HTML tag set correctly (inc spaces)', function () {

      const testCase = "<p>Hello World</p> <span>Foo bar</span>";
      const expected = '111000000000001111011111100000001111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlTagsParser(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('parse complex nested string correctly', function () {

      const testCase = "Hello world. <p>How are we doing <span>today</span>?</p>";
      const expected = '00000000000001110000000000000000011111100000111111101111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlTagsParser(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('should handle two matching text nodes correctly', function () {

      const testCase = '<p>One</p><p>Two</p>'
      const expected = '11100011111110001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = htmlTagsParser(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

  });

});
