/**
 *
 * @param input
 * @return {[]}
 */
const encodeToIndex = (input) => {

  const regex = /(1)\1+/g;
  const output = [];
  const matches = input.matchAll(regex);

  for (const match of matches) {
    let start = match.index;
    let end = match.index + match[0].length;
    output.push([start, end]);
  }

  return output;

}

module.exports.encodeToIndex = encodeToIndex;
