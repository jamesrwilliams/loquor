const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 * Parse an input string and return the text that should be translated
 *
 * @param {string} cellText The string we want to parse.
 * @return {string[]} An array of substrings that should be translated.
 */
const parser = (cellText) => {

  const html = JSDOM.fragment(cellText);
  const nodes = textNodesUnder(html);
  const results = [];

  nodes.forEach((node) => {
    const content = node.textContent.trim();

    if(/\S/.test(content)) {
      results.push(content);
    }
  });

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
