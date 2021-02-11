const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { replaceBetween } = require('../utils/replacer');

/**
 *
 * @param {string} original The source string we want to apply this ruleset too.
 * @param {string} encoded The starting encoding string to apply new formatting rules on-top of.
 * @return { string } The newly encoded output.
 */
const htmlTagsParser = (original, encoded) => {

  const html = new JSDOM(original);
  const document = html.window.document;
  const nodes = textNodesUnder(document);

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

  let response = Array(original.length + 1).join('0');

  for (let i = 0; i < nodes.length; i++) {

    const string = nodes[i].textContent;

    console.log(string);
    console.log(original);
    console.log(outputHTML);

    let startMarker = `%${i}__%`;
    let endMarker   = `%__${i}%`;

    let markerLength = startMarker.length;

    let startOffset = (markerLength * 2) * i;
    let endOffset = ((markerLength * 2) * i) + (markerLength);

    let start = outputHTML.indexOf(startMarker) - (startOffset);
    let end = outputHTML.indexOf(endMarker) - (endOffset);

    console.log({start, end});

    response = replaceBetween(response, start, end);

  }

  return invertResponse(response);

}

const invertResponse = (response) => {
  return response.split('').map((value) => value === '1' ? '0' : '1' ).join('');
}

const htmlEntitiesParser = (original, encoded) => {
  const filterExpression = /&#?[a-z0-9]+;/ig;

  const matches = original.matchAll(filterExpression);

  let response = Array(original.length + 1).join('0');

  for (const match of matches) {
    let start = match.index;
    let end = match.index + (match[0].length);
    response = replaceBetween(response, start, end);
  }

  return response;
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
    if (node.nodeType===3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

module.exports.htmlTagsParser = htmlTagsParser;
module.exports.htmlEntitiesParser = htmlEntitiesParser;
