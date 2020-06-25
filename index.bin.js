#!/usr/bin/env node
const cssClean = require('./index.js');
const args = process.argv.slice(2);
const fs = require('fs');
const path = require('path');
function isFlag(str) {return /^--\w+=\w+/.test(str);}

let config = {
  line_break : 80,
  tab_size   : 2,
  tab_char   : 'space'
}

var homeD  = path.join(require('os').homedir(), '.csscleanrc');
var rootD  = path.join(path.dirname(process.argv[1]), '.csscleanrc');
var inputD = path.join(path.dirname(args[0]), '.csscleanrc');
let configFile;

if (fs.existsSync(homeD))
  configFile = JSON.parse(fs.readFileSync(homeD));
if (fs.existsSync(rootD))
  configFile = JSON.parse(fs.readFileSync(rootD));
if (fs.existsSync(inputD))
  configFile = JSON.parse(fs.readFileSync(inputD));

if (configFile)
  Object.assign(config, configFile);

let i = 1;
let f = {};
for (; i < args.length; i++) {
  if (isFlag(args[i])) {
    var flag  = args[i].slice(2, args[i].indexOf('='));
    var value = args[i].slice(args[i].indexOf('=') + 1);
    f[flag] = value;
  }

  else {
    configFile = null;
    configFile = JSON.parse(fs.readFileSync(args[i]));
    if (configFile) {Object.assign(config, configFile);}
  }
} Object.assign(config, f);

if (config.tab_char === 'space')
  config.tab_char = ' ';
else if (config.tab_char === 'tab')
  config.tab_char = '\t';

let clean = cssClean({
  css       : fs.readFileSync(args[0], 'utf8'),
  lineBreak : config.line_break,
  tabSize   : config.tab_size,
  tabChar   : config.tab_char
});

if (require('tty').isatty(process.stdout.fd))
  fs.writeFileSync(args[0], clean);
else
  process.stdout.write(clean);
