const twigParser = require('../rules/twig/twig.rules');
const { htmlTagsParser, htmlEntitiesParser } = require('../rules/html/html.rules');
const handlebarsParser = require('../rules/handlebars/handlebars.rules');

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const core = (cellText) => {

  const ruleset = [
    htmlTagsParser,
    htmlEntitiesParser,
    handlebarsParser,
    twigParser
  ];
  const results = [];

  if(cellText === '') {
    return results;
  }

  // Initialise with default formatting template.
  let output = Array(cellText.length).join('0');

  ruleset.forEach((validator) => {
    output = validator(cellText, output);
  });

  return output;

}

module.exports.parser = core;
