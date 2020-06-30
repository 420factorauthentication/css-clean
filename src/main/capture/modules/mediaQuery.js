const nested = require('./nested');
const splitByComma = require('../../../vendor/splitByComma');

function pushLine(lines, v, i) {
  let x;

  if (lines[lines.length - 1].length) {
    lines.push('');
  }

  x = lines.length - 1;

  while (v.substring(i + 1, i + 1 + 3) !== 'and' && v[i]) {
    lines[x] = lines[x].concat(v[i]);
    i++;
  }

  return i;
}

function getChunk(line, startChr, untilChr) {
  let i = line.indexOf(startChr) + 1;
  let n = line.length;
  let chunk = '';

  while (line[i] !== untilChr && i < n) {
    chunk += line[i];
    i++;
  }

  return chunk.trim();
}

function mediaQuery(buffer, depth) {
  let c = nested(buffer, depth);
  let m = c.arguments.split(' ');
  let name = m[0];
  let value = m.slice(1).join(' ').replace(/\s+|\n/g, ' ');

  value = splitByComma(value);

  value = value.map(function (v) {
    let lines = [''];
    let i = 0;
    let n = v.length;

    for (; i < n; i++) {
      if (v.substring(i, i + 4) === 'only' && [' ', '('].indexOf(v[i + 4]) !== -1) {
        i = pushLine(lines, v, i);
      } else if (v.substring(i, i + 3) === 'and' && [' ', '('].indexOf(v[i + 3]) !== -1) {
        i = pushLine(lines, v, i);
      } else {
        lines[lines.length - 1] = lines[lines.length - 1].concat(v[i]);
      }
    }

    return lines.map(function (line) {
      let buffer = line;
      let type;
      let operator;
      let property;
      let value;

      if (line.trim().substring(0, 4) === "only") {
        buffer = line.substring(4);
        operator = "only";
      }

      else if (line.trim().substring(0, 3) === "and" || line.substring(0, 3) === "not") {
        buffer = line.substring(3);
        operator = line.substring(0, 3);
      }

      if (buffer.search(/\ball\b|\bprint\b|\bscreen\b|\bspeech\b/) != -1) {
        type = "media";
        value = buffer.trim();
      }

      else {
        let s = buffer.split(":");
        type = "feature";

        if (s.length === 2) {
          property = s[0].trim().substring(1),
          value = s[1].trim().substring(0, s[1].length - 2)
        }

        else if (buffer.search(/\(/) != -1)
          property = getChunk(buffer, '(', ')');

        else
          property = buffer.trim();
      }

      return {
        type     : type,
        operator : operator,
        property : property,
        value    : value
      }
    });
  });

  buffer.string = buffer.string.substring(c.length);

  return {
    content : c.content,
    name : name,
    value : value
  };
}

module.exports = mediaQuery;
