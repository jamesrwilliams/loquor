/**
 *
 * @param input
 * @return {[]}
 */
const encodedToIndex = (input) => {
  const regex = /(1)\1+/g;
  const output = [];
  const matches = input.matchAll(regex);

  // eslint-disable-next-line
  for (const match of matches) {
    const start = match.index;
    const end = match.index + match[0].length;
    output.push([start, end]);
  }

  return output;
};

module.exports.encodedToIndex = encodedToIndex;
