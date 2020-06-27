module.exports = function variableAssignment(buffer) {
  let m = buffer.string.match(/([^:]+?):([^;]+?);/);

  buffer.string = buffer.string.substring(m[0].length);

  return {
    name : m[1].trim(),
    value : m[2].trim()
  };
};
