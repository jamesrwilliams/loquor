const invertResponse = (input) => input.split('').map((value) => (value === '1' ? '0' : '1')).join('');

module.exports.invertResponse = invertResponse;
