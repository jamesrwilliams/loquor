const { expect } = require('chai');
const { tags, entities } = require('./html.rules');

describe('Syntax: HTML', () => {
  describe('Entities', () => {
    it('should mark HTML entities', () => {
      const testCase = 'foo bar&nsbp;';
      const expected = '0000000111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = entities(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    it('should mark multiple HTML entities', () => {
      const testCase = '&lt;testdata&gt;';
      const expected = '1111000000001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = entities(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    it('passes through the formatting string if nothing needs changing', () => {
      const testCase = '<p>Hello World</p>';
      const expected = '111000000000000111';
      const result = entities(testCase, expected);

      expect(result).to.equal(expected);
    });
  });

  describe('Tags', () => {
    it('should mark a basic HTML tags', () => {
      const testCase = '<p>Hello World</p>';
      const expected = '111000000000001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    it('parse a two part HTML tag set correctly (inc spaces)', () => {
      const testCase = '<p>Hello World</p> <span>Foo bar</span>';
      const expected = '111000000000001111011111100000001111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('passes through the formatting string if nothing needs changing', () => {
      const testCase = '&nbsp;Hello World';
      const expected = '11111100000000000';
      const result = tags(testCase, expected);

      expect(result).to.equal(expected);
    });

    it('parse a nested string correctly', () => {
      const testCase = 'Hello world. <p>How are we doing <span>today</span>?</p>';
      const expected = '00000000000001110000000000000000011111100000111111101111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('parse complex nested string correctly', () => {
      const testCase = '<h1>Hello world. <p>How are we doing <span>today</span>?</p></h1>';
      const expected = '11110000000000000111000000000000000001111110000011111110111111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('nested html', () => {
      const testCase = '<p>Hello <em>World</em></p>';
      const expected = '111000000111100000111111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result).to.equal(expected);
    });

    it('should handle two matching text nodes correctly', () => {
      const testCase = '<p>One</p><p>Two</p>';
      const expected = '11100011111110001111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);

      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });

    // it('should work with tags at the very start', () => {
    //   const testCase = `<strong>Error:</strong> lorem ipsum.`;
    //   const expected = '111111110000001111111110000000000000';
    //   const encoded = Array(testCase.length + 1).join('0');
    //   const result = tags(testCase, encoded);
    //   expect(result.length).to.equal(expected.length);
    //   expect(result).to.equal(expected);
    // });

    it('should work with tags at the very end', () => {
      const testCase = 'Lorem ipsum <strong>error</strong>';
      const expected = '0000000000001111111100000111111111';
      const encoded = Array(testCase.length + 1).join('0');
      const result = tags(testCase, encoded);
      expect(result.length).to.equal(expected.length);
      expect(result).to.equal(expected);
    });
  });
});
