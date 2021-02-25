const { twigParser } = require('../../rules/twig/twig.rules');
const { tags, entities } = require('../../rules/html/html.rules');
const { handlebarsParser } = require('../../rules/handlebars/handlebars.rules');

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const encodeValue = (cellText) => {

  const ruleset = [
    tags,
    entities,
    handlebarsParser,
    twigParser
  ];

  const input = cellText.toString();

  let encoded = Array(input.length + 1).join('0');

  if(input !== '') {
    ruleset.forEach((validator) => {
      encoded = validator(input, encoded);
    });
  }

  return encoded;

}

module.exports.encodeValue = encodeValue;
