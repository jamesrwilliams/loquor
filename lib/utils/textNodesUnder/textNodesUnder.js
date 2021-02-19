/**
 * Recursive function to return an array of text nodes within a HTML node
 *
 * @param {HTMLAllCollection} node The starting HTML node we're using to find text nodes.
 * @return {string[]} An array of text strings within the HTML node.
 */

function textNodesUnder(node) {

  let count = 0;

  const recursive = () => {
    let all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) {
        count++;
        all.push(node);
      } else {
        all = all.concat(textNodesUnder(node));
      }
    }

    return all;
  }

  return recursive();

}

module.exports.textNodesUnder = textNodesUnder;
