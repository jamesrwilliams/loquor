const chai = require('chai');

const { expect } = chai;
const { JSDOM } = require('jsdom');
const { textNodesUnder } = require('./textNodesUnder');

describe('Utility: testNodesUnder()', () => {
  it('should export a named function', () => {
    expect(textNodesUnder.name).to.equal('textNodesUnder');
  });

  describe('a single HTML tag (no whitespace)', () => {
    const testCase = '<p>Hello World</p>';
    const html = JSDOM.fragment(testCase);
    const result = textNodesUnder(html);

    it('should be an array', () => {
      expect(result).to.be.a('array');
    });

    it('should be of length 1', () => {
      expect(result).to.be.length(1);
    });

    it('should have the textleaf value', () => {
      expect(result[0].textContent).to.equal('Hello World');
    });
  });

  describe('a single HTML tag with whitespace', () => {
    const testCase = '   <p>Hello World!</p>    ';
    const html = JSDOM.fragment(testCase);
    const result = textNodesUnder(html);

    it('should be an array', () => {
      expect(result).to.be.a('array');
    });

    it('should be of length 1', () => {
      expect(result).to.be.length(3);
    });

    it('should have the text leaves in an array', () => {
      expect(result[0].textContent).to.equal('   ');
      expect(result[1].textContent).to.equal('Hello World!');
      expect(result[2].textContent).to.equal('    ');
    });
  });

  describe('a nested HTML tag fragment', () => {
    const testCase = '<p><strong>Hello</strong> World!</p>';
    const html = JSDOM.fragment(testCase);
    const result = textNodesUnder(html);

    it('should be an array', () => {
      expect(result).to.be.a('array');
    });

    it('should be of length 1', () => {
      expect(result).to.be.length(2);
    });

    it('should have the textleafs in an array', () => {
      expect(result[0].textContent).to.equal('Hello');
      expect(result[1].textContent).to.equal(' World!');
    });
  });
});
