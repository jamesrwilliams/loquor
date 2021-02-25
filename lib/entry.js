const { encodedToIndex } = require('./utils/encodedToIndex/encodedToIndex');
const { encodeValue } = require('./utils/encodeValue/encodeValue');

/**
 *
 * @param value
 * @return {*}
 */
const entry = (value) => {
  const encoded = encodeValue(value);
  return encodedToIndex(encoded);
};

module.exports.entry = entry;
