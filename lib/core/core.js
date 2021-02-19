const { twigParser } = require('../rules/twig/twig.rules');
const { tags, entities } = require('../rules/html/html.rules');
const { handlebarsParser } = require('../rules/handlebars/handlebars.rules');

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const core = (cellText) => {

  const ruleset = [
    tags,
    entities,
    handlebarsParser,
    twigParser
  ];
  const results = [];

  if(cellText === '') {
    return results;
  }

  // Initialise with default formatting template.
  let encoded = Array(cellText.length).join('0');

  ruleset.forEach((validator) => {
    encoded = validator(cellText, encoded);
  });

  const regex = /(1)\1+/g;
  const matches = encoded.matchAll(regex);
  const output = [];

  for (const match of matches) {
    let start = match.index;
    let end = match.index + match[0].length;
    output.push([start, end]);
  }

  return output;

}

module.exports.core = core;
