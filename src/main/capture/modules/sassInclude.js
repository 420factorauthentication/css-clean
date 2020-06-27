function sassInclude(buffer) {
  let m = buffer.string.match(/^(@include)([^;]+?);/);

  buffer.string = buffer.string.substring(m[0].length);

  return {
    name : m[1],
    value : m[2].trim(),
  };
}

module.exports = sassInclude;
