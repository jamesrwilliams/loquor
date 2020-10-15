const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/**
 *
 * @param {string} cellText
 * @return {array} Array containing pairs of numbers, which are start and end strings for each cell value;
 */
const parser = (cellText) => {

  const html = JSDOM.fragment(cellText);
  const nodes = textNodesUnder(html);
  const results = [];

  nodes.forEach((node) => {
    var content = node.textContent

    if(/\S/.test(content)) {
      var start = cellText.indexOf(content);
      var end = start + content.length;

      results.push([content, [start, end]]);
    }
  });

  return results;
}

function textNodesUnder(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

module.exports.parser = parser;
