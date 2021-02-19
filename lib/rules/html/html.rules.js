const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { replaceBetween, invertResponse, textNodesUnder } = require('../../utils');

/**
 *
 * @param {string} original The source string we want to apply this ruleset too.
 * @param {string} encoded The starting encoding string to apply new formatting rules on-top of.
 * @return { string } The newly encoded output.
 */
const tags = (original, encoded) => {

  let response = encoded;

  const dom = new JSDOM(
    `${original}`,
    { includeNodeLocations: true }
  );

  const nodes = textNodesUnder(dom.window.document);

  nodes.forEach((node, i) => {

    let el = nodes[i], child = el.firstChild, nextChild;

    while (child) {
      nextChild = child.nextSibling;
      if (child.nodeType === 3) {
        el.removeChild(child);
      }
      child = nextChild;
    }

    let location = dom.nodeLocation(el);

    if(location !== null) {
      const { startOffset, endOffset } = location;
      response = replaceBetween(response, startOffset, endOffset);
    }

  });


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
