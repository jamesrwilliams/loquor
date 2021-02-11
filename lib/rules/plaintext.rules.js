const { replaceBetween } = require('../utils/replacer');

/**
 *
 * @param {string} original The source string we want to apply this ruleset too.
 * @param {string} encoded The starting encoding string to apply new formatting rules on-top of.
 * @return { string } The newly encoded output.
 */
const plaintextParser = (original, encoded) => {
  return encoded;
};

module.exports.plaintextParser = plaintextParser;
