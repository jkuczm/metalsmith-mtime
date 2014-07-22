# metalsmith-mtime

A [Metalsmith](http://metalsmith.io) plugin that adds files last modification
times to their Metalsmith metadata.

[![Build Status](https://travis-ci.org/jkuczm/metalsmith-mtime.svg?branch=master)](https://travis-ci.org/jkuczm/metalsmith-mtime)
[![Coverage Status](https://img.shields.io/coveralls/jkuczm/metalsmith-mtime.svg)](https://coveralls.io/r/jkuczm/metalsmith-mtime?branch=master)
[![npm version](http://img.shields.io/npm/v/metalsmith-mtime.svg)](https://www.npmjs.org/package/metalsmith-mtime)
[![Dependency Status](https://david-dm.org/jkuczm/metalsmith-mtime.svg)](https://david-dm.org/jkuczm/metalsmith-mtime)
[![devDependency Status](https://david-dm.org/jkuczm/metalsmith-mtime/dev-status.svg)](https://david-dm.org/jkuczm/metalsmith-mtime#info=devDependencies)
[![License MIT](http://img.shields.io/npm/l/metalsmith-mtime.svg)](https://github.com/jkuczm/metalsmith-mtime/blob/master/LICENSE)


This plugin iterates over Metalsmith `files` and adds `mtime` property to
metadata of each entry in `files` that corresponds to file existing in
filesystem. Value of this property is an instance of `Date` representing files
last modification time.

`mtime` property can be used e.g. in a template
(here we use [swig](https://paularmstrong.github.io/swig/)):
```
Last modified: {{ mtime|date('Y.m.d H:i') }}
```


## Installation

```sh
$ npm install metalsmith-mtime
```


## Usage

### JavaScript

```js
var mtime = require('metalsmith-mtime');

metalsmith.use(mtime()));
```

### CLI

Add the `metalsmith-mtime` key to your `metalsmith.json` plugins:

```json
{
  "plugins": {
    "metalsmith-mtime": true
  }
}
```


## Tips

If you keep source code of your website in Git,
be aware that Git does not store file mtimes.
So to use this plugin you would also need one of
[additional tools for handling metadata in Git](https://git.wiki.kernel.org/index.php/InterfacesFrontendsAndTools#Backups.2C_metadata.2C_and_large_files).
