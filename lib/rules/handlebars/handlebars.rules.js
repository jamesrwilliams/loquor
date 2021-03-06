const { replaceBetween } = require('../../utils/replaceBetween/replaceBetween');

/**
 * Applies formatting rules to strings based on the handlebars ruleset.
 *
 * @param {string} original The source string we want to apply this ruleset too.
 * @param {string} encoded The starting encoding string to apply new formatting rules on-top of.
 * @return { string } The newly encoded output.
 */
const handlebarsParser = (original, encoded) => {
  // Find any stings wrapped in one or more "{" "}" characters.
  const filterExpression = /{+.*?}+/g;

  const matches = original.matchAll(filterExpression);

  let response = encoded;

  for (const match of matches) {
    const start = match.index;
    const end = match.index + (match[0].length);
    response = replaceBetween(response, start, end);
  }

  return response;
};

module.exports.handlebarsParser = handlebarsParser;
