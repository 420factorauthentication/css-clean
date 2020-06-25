# Just Another CSS Kit — Only For Fun
Just Another CSS Kit — Only For Fun is a fork of [css-clean](https://www.npmjs.com/package/css-clean) with more customization options.

## Features
- Updated CLI usage to accept a config file, similar to [atom-css-clean](https://atom.io/packages/atom-css-clean).

## Command Line Usage
To install and use globally:

    npm i -g css-clean-fork
    cssclean input.css [config.json] [--config_flag ...] [> output.css]

Also supports [.scss](https://sass-lang.com/).

### Configuration
To configure, create a JSON file:  

    {
        "line_break": 80,
        "tab_size": 2,
        "tab_char": "space"
    }

By default, Just Another CSS Kit — Only For Fun searches for a file named `.csscleanrc` in this order:
  1. The same directory as input.css
  2. The root directory of this npm module
  3. The user's root home directory

You can also pass a config file through the CLI:

    cssclean input.css config.json

Or you can pass individual properties as flags:

    cssclean input.css --line_break=80 --tab_size=2

Or both:

    cssclean input.css config.json --line_break=80


## Programmatic Usage
css-clean exports a single function, which takes a JSON object that includes the string to process and configurable options.

    var cleanCss = require("css-clean-fork")
    var output   = cleanCss({
      css       : String,
      lineBreak : Number, // Optional, default is 80
      tabSize   : 2,      // Optional, default is 2
      tabChar   : ' '     // Optional, default is ' ' })
