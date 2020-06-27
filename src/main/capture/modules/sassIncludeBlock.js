const nested = require('./nested');

function sassIncludeBlock(buffer, depth) {
  let c = nested(buffer, depth);

  buffer.string = buffer.string.substring(c.length);

  return {
    content : c.content,
    name : '@include',
    value : c.arguments.split(' ')[1],
  };
}

module.exports = sassIncludeBlock;
