const JSDOM = require("jsdom").JSDOM;
const { replaceBetween, invertResponse, textNodesUnder } = require('../../utils');

/**
 *
 * @param {string} original The source string we want to apply this ruleset too.
 * @param {string} encoded The starting encoding string to apply new formatting rules on-top of.
 * @return { string } The newly encoded output.
 */
const tags = (original, encoded) => {

  const html = new JSDOM(original);
  const document = html.window.document;
  const nodes = textNodesUnder(document);

  /**
   * Add the dom markers
   */
  nodes.forEach((node, i) => {
    let content = node.textContent;

    nodes[i].parentElement.innerHTML = `[${i}-]` + content + `[-${i}]`;

  });

  const outputHTML = document.body.innerHTML;

  let response = Array(original.length + 1).join('0');

  let count = 0;

  for (let i = 0; i < nodes.length; i++) {

    const string = nodes[i].textContent;
    const trimmed = string.trim();

    if(trimmed !== '') {

      count++;

      let startMarker = `[${i}-]`;
      let endMarker = `[-${i}]`;

      let markerLength = startMarker.length;

      let startOfMarker = outputHTML.indexOf(startMarker) - markerLength;

      if(startOfMarker < 0 ) {
        startOfMarker = 0;
      }

      let endOfMarker = outputHTML.indexOf(endMarker) - markerLength;

      // response = replaceBetween(response, startOfMarker, endOfMarker);

    }

  }

  return invertResponse(response);

}

const entities = (original, encoded) => {
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

module.exports.tags = tags;
module.exports.entities = entities;
