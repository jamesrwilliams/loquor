/**
 * Function to replace ranges of a format string with 1's
 *
 * @param {string} original The original format string we're formatting
 * @param {number} startIndex The start of the range to format.
 * @param {number} endIndex The end of the range to format.
 * @return {string}
 */
function replaceBetween(original, startIndex, endIndex) {
  const matchLength = endIndex - startIndex;

  if (matchLength <= original.length) {
    const prefix = original.substring(0, startIndex);
    const insertion = Array(matchLength + 1).join('1');
    const suffix = original.substring(endIndex);
    return prefix + insertion + suffix;
  }
  return original;
}

module.exports.replaceBetween = replaceBetween;
