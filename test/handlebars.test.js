


const chai = require('chai');
const expect = chai.expect;

const { parser } = require('../lib/parser');

describe('Ruleset: Handlebars', () => {

  describe('Correctly ignore content within handlebars. E.g. {key}', function() {
    const testCase = `<span style="color: red;">{foo}</span>`;
    const result = parser(testCase);

    it('should return an empty array', function () {
      expect(result).to.be.empty;
    });
  });

  describe('Correctly ignore content within nested handlebars. E.g. {{key}}', function() {
    const testCase = `<span style="color: red;">{foo}</span>`;
    const result = parser(testCase);

    it('should return an empty array', function () {
      expect(result).to.be.empty;
    });
  });

});
