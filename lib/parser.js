const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const parser = (cellText) => {

  // const html = JSDOM.fragment(cellText);
  const html = new JSDOM(cellText);
  const document = html.window.document;
  const nodes = textNodesUnder(document);
  const results = [];

  /**
   * Add the dom markers
   */
  nodes.forEach((node, i) => {
    let content = node.textContent;

    if(/\S/.test(content)) {
      nodes[i].parentElement.innerHTML = `%${i}__%` + content + `%__${i}%`;
    }

  });

  const outputHTML = document.body.innerHTML;

  let offsetMultiplier = 0;

  for (let i = 0; i < nodes.length; i++) {

    if(/\S/.test(nodes[i].textContent)) {

      let startMarker = `%${i}__%`;
      let endMarker = `%__${i}%`;

      let markerLength = startMarker.length;

      let startOffset = (markerLength * 2) * offsetMultiplier;
      let endOffset = ((markerLength * 2) * offsetMultiplier) + (markerLength + 1);

      let start = outputHTML.indexOf(startMarker) - (startOffset);
      let end = outputHTML.indexOf(endMarker) - (endOffset);

      results.push([
        start, end
      ]);

      offsetMultiplier++;

    }

  }

  return results;
}

/**
 * Recursive function to return an array of text nodes within a HTML node
 *
 * @param {HTMLAllCollection} node The starting HTML node we're using to find text nodes.
 * @return {string[]} An array of text strings within the HTML node.
 */
function textNodesUnder(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

module.exports.parser = parser;
