const { invertResponse } = require('./invertResponse/invertResponse');
const { replaceBetween } = require('./replaceBetween/replaceBetween');
const { encodedToIndex } = require('./encodedToIndex/encodedToIndex');
const { textNodesUnder } = require('./textNodesUnder/textNodesUnder');
const { encodeValue } = require('./encodeValue/encodeValue');

module.exports = {
  invertResponse,
  textNodesUnder,
  replaceBetween,
  encodeValue,
  encodedToIndex,
};
