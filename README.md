# Website Project

## Requirements

 * [NPM](http://nodejs.org/download/)
 * [Grunt](http://gruntjs.com/getting-started)

## Installation

Frontend dependencies:

	$ npm install

## Usage

Compiling assets:

 * `grunt` to compile the minified JS/CSS.
 * `grunt js` and `grunt css` respectively to compile unminified JS/CSS.
 * `grunt js:prod` and `grunt css:prod` respectively to compile minified production JS/CSS.
 * `grunt watch` to watch for changes and recompile development files.
 * `grunt watch:prod` to watch for changes and recompile production files.

Using [Grunt](http://gruntjs.com) to manage frontend tasks, with [SCSS](http://sass-lang.com/) and [Browserify](http://browserify.org/) as precompilers.