function flattenFeature(element, opt, condition, index) {
  let hasOperator = condition.operator ? true : false;
  let hasProperty = condition.property ? true : false;
  let hasValue    = condition.value    ? true : false;

  let operator = hasOperator ? condition.operator : '';
  let property = hasProperty ? condition.property : '';
  let value    = hasValue    ? condition.value    : '';


  let nameOpPad = new Array(Math.max(0,
    opt.nameOpPad + 1
    - (index === 0 && opt.mFeatStartBr === 0 ? element.name.length + 1 : 0)
    - (hasOperator ? operator.length + 1 : 0)))
  .join(' ');

  let propPad = new Array(Math.max(0,
    opt.propPad + 1
    - condition.property.length))
  .join(' ');

  let valuePad = new Array(Math.max(0,
    opt.valuePad
    - (hasValue ? value.length : 0)))
  .join(' ');


  let nameOp =
      opt.mFeatStartJustify === "left"      ?  `${operator}(`
    : opt.mFeatStartJustify === "right"     ?  `${nameOpPad}${propPad}${operator}(`
    : opt.mFeatStartJustify === "op_left"   ?  `${operator}${nameOpPad}(`
    : opt.mFeatStartJustify === "op_right"  ?  `${operator}${nameOpPad}${propPad}(`
                                            :  `${operator}(`;

  let prop =
      opt.mFeatStartJustify === "left"      ?  `${property}${nameOpPad}${propPad}`
    : opt.mFeatStartJustify === "right"     ?  `${property}`
    : opt.mFeatStartJustify === "op_left"   ?  `${property}${propPad}`
    : opt.mFeatStartJustify === "op_right"  ?  `${property}`
                                            :  `${property}${nameOpPad}${propPad}`

  let val =
      opt.mFeatEndJustify === "left"   ?  ` : ${value})`
    : opt.mFeatEndJustify === "right"  ?  ` : ${valuePad}${value})`
                                       :  ` : ${value})`

  return nameOp + prop + val;
}

function flattenMedia(opt, condition) {
  return `${condition.value}`;
}

function joinLines(element, opt) {
  let tab = new Array(((element.depth) * opt.tabSize) + opt.mFeatIndentSize + 1).join(' ');
  let sBr = new Array(Math.max(0, opt.mFeatStartBr ? opt.mFeatStartBr + 1 : 0)).join('\n');
  let eBr =  new Array(Math.max(0, opt.mFeatEndBr ? opt.mFeatEndBr + 1 : 0)).join('\n');

  let f = 0;
  return opt.rule
    .map(function (condition, i) {
      return (!f++ ? '' : tab) +
        (condition.type === "media"
          ? flattenMedia(opt, condition)
          : flattenFeature(element, opt, condition, i))
    })
    .join('\n')
    .replace(/^/, sBr)
    .replace(/$/, eBr);
}

function mediaQuery(that, element, siblings) {
  const nested = require('./nested');
  let value;
  let nest     = nested(that, element, siblings);
  let tab      = new Array((element.depth * that.tabSize) + 1).join(that.tabChar);


  let f = 0;
  let nameOpPad = element.value.map(value => (value.map(b =>
      (!f ? 0 : (that.mFeatIndentSize >= 0 ? that.mFeatIndentSize : 0))
      + (!f++ && that.mFeatStartBr === 0 ? element.name.length + 1 : 0)
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

  return `${element.name} ${value} {\n${nest}${tab}}`;
}

module.exports = mediaQuery;


// + (!f && that.mFeatBr === 1 ? element.name.length + 1 : 0)
// + (!f++ ? 0 : (that.mFeatIndentSize >= 0 ? that.mFeatIndentSize : 0))
// + (that.mFeatJustify === "right" && b.operator ? b.operator.length + 1 : 0)))
