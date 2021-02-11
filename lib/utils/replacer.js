/**
 *
 * @param original
 * @param startIndex
 * @param endIndex
 * @return {string}
 */
function replaceBetween(original, startIndex, endIndex) {

  const matchLength = endIndex - startIndex;

  const prefix = original.substring(0, startIndex);
  const insertion = Array(matchLength + 1).join('1');
  const suffix = original.substring(endIndex);

  return prefix + insertion + suffix;

}

module.exports.replaceBetween = replaceBetween;
