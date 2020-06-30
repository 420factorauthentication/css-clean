function flatten(element, opt, condition, index) {
  let hasOperator = condition.operator ? true : false;
  let hasProperty = condition.property ? true : false;
  let hasValue    = condition.value    ? true : false;

  let operator = hasOperator ? condition.operator : '';
  let property = hasProperty ? condition.property : '';
  let value    = hasValue    ? condition.value    : '';

  let nameOp;
  let prop;
  let val;


  let nameOpPad = new Array(Math.max(0,
    opt.nameOpPad + 1
    - (index === 0 && opt.mFeatStartBr === 0
        ? element.name.length + 1
        : opt.mFeatIndentSize)
    - (hasOperator ? operator.length : 0)
  )).join(' ');

  let propPad = new Array(Math.max(0,
    opt.propPad + 1
    - (hasProperty ? property.length : 0)
  )).join(' ');

  let valuePad = new Array(Math.max(0,
    opt.valuePad
    - (hasValue ? value.length : 0)
  )).join(' ');


  switch (condition.type) {
    default:
    case "feature":
      switch (opt.mFeatStartJustify) {
        default:
        case "left":
          nameOp = `${operator}(`;
          prop   = `${property}` + (value ? `${nameOpPad}${propPad}` : ")");
          break;
        case "right":
          nameOp = `${nameOpPad}${propPad}${operator}(`;
          prop   = `${property}` + (value ? '' : ")");
          break;
        case "op_left":
          nameOp = `${operator}${nameOpPad}(`;
          prop   = `${property}` + (value ? `${propPad}` : ")");
          break;
        case "op_right":
          nameOp = `${operator}${nameOpPad}${propPad}(`;
          prop   = `${property}` + (value ? '' : ")");
          break;
      }

      switch (opt.mFeatEndJustify) {
        default:
        case "left":
          val = value ? ` : ${value})` : '';
          break;
        case "right":
          val = value ? ` : ${valuePad}${value})` : '';
          break;
      } break;

    case "media":
      switch (opt.mTypeJustify) {
        default:
        case "left":
          nameOp = `${operator} `;
          prop   = '';
          val    = `${value}`;
          break;
        case "left_left":
          nameOp = `${operator}${nameOpPad}${propPad}`;
          prop   = '';
          val    = `   ${value}`;
          break;
        case "left_right":
          nameOp = `${operator}${nameOpPad}${propPad}`;
          prop   = '';
          val    = `   ${valuePad}${value}`;
          break;
        case "right_left":
          nameOp = `${nameOpPad}${propPad}${operator}`;
          prop   = '';
          val    = `   ${value}`;
          break;
        case "right_right":
          nameOp = `${nameOpPad}${propPad}${operator}`;
          prop   = '';
          val    = `   ${valuePad}${value}`;
          break;
      } break;
  }

  return nameOp + prop + val;
}

function joinLines(element, opt) {
  let tab = new Array(Math.max(0, element.depth * opt.tabSize + opt.mFeatIndentSize + 1)).join(opt.tabChar);
  let sBr = new Array(Math.max(0, opt.mFeatStartBr ? opt.mFeatStartBr + 1 : 0)).join('\n');
  let eBr = new Array(Math.max(0, opt.mFeatEndBr ? opt.mFeatEndBr + 1 : 0)).join('\n');

  let f = 0;
  return opt.rule
    .map(function (condition, i) {
      return (!f++ && opt.mFeatStartBr === 0 ? '' : tab) +
      flatten(element, opt, condition, i);
    })
    .join('\n')
    .replace(/^/, sBr)
    .replace(/$/, eBr);
}

function mediaQuery(that, element, siblings) {
  const nested = require('./nested');
  let value;
  let nest     = nested(that, element, siblings);
  let tabOpen  = new Array(element.depth * that.tabSize).join(that.tabChar);
  let tabClose = new Array(element.depth * that.tabSize + 1).join(that.tabChar);


  let f = 0;
  let nameOpPad = element.value.map(value => (value.map(b =>
      (!f++ && that.mFeatStartBr === 0 ? element.name.length + 1 : that.mFeatIndentSize)
      + (b.operator ? b.operator.length + 1 : 0))
    .sort((a, b) => b - a)[0])).sort((a, b) => b - a)[0];

  let propPad = element.value.map(value => (value.map(b =>
    b.property ? b.property.length : b.mediaType ? b.mediaType.property.length : 0)
    .sort((a, b) => b - a)[0])).sort((a, b) => b - a)[0];

  let valuePad = element.value.map(value => (value.map(b =>
    b.value ? b.value.length : 0)
    .sort((a, b) => b - a)[0])).sort((a, b) => b - a)[0];


  value = element.value.map(function (rule, i) {
    let value = joinLines(element, {
      rule              : rule,
      tabSize           : that.tabSize,
      tabChar           : that.tabChar,

      nameOpPad         : nameOpPad,
      propPad           : propPad,
      valuePad          : valuePad,

      mFeatIndentSize   : that.mFeatIndentSize,
      mFeatStartJustify : that.mFeatStartJustify,
      mFeatEndJustify   : that.mFeatEndJustify,
      mTypeJustify      : that.mTypeJustify,
      mFeatStartBr      : that.mFeatStartBr,
      mFeatEndBr        : that.mFeatEndBr
    });

    return value;
  }).join(',\n')
  .replace(/^/, that.mFeatBr === 0 ? '\n' : '');

  return `${element.name} ${value} ${tabOpen}{\n${nest}${tabClose}}`;
}

module.exports = mediaQuery;
