const capture = require('./src/main/capture/capture');
const sortCss = require('./src/main/sortCss/sortCss');
const index = require('./src/main/index/index');
const getValue = require('./src/main/getValue/getValue');

function cleanCss(props) {
  let settings = {
    buffer            : { string : props.css.trim() },
    lineBreak         : props.lineBreak         || 80,
    tabSize           : props.tabSize           || 2,
    tabChar           : props.tabChar           || ' ',

    // Media Queries
    mFeatIndentSize   : props.mFeatIndentSize   || 2,
    mFeatStartJustify : props.mFeatStartJustify || "left",
    mFeatEndJustify   : props.mFeatEndJustify   || "left",
    mTypeJustify      : props.mTypeJustify      || "left",
    mFeatStartBr      : props.mFeatStartBr      || 0,
    mFeatEndBr        : props.mFeatEndBr        || 0
  };

  let cssObject = capture(settings, [], 0);

  sortCss(settings, cssObject);
  index(cssObject, 0);

  return getValue(settings, cssObject);
}

module.exports = function (props) {
  return cleanCss(props);
};
