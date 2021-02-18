import { twigParser } from './rules/twig.rules'
const { htmlParser } = require('./rules/html.rules');
const { handlebarsParser } = require('./rules/handlebars.rules');

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const parser = (cellText) => {

  const defaultRuleset = [htmlParser, handlebarsParser, twigParser];
  const results = [];

  if(cellText === '') {
    return results;
  }

  // Initialise with default formatting template.
  let output = Array(cellText.length).join('0');

  defaultRuleset.forEach((validator) => {
    output = validator(cellText, output);
  });

  return output;

}

module.exports.parser = parser;
