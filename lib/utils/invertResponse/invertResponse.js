const invertResponse = (input) => {
  return input.split('').map((value) => value === '1' ? '0' : '1' ).join('');
}

module.exports.invertResponse = invertResponse;
