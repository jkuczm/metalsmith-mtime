# metalsmith-mtime

A [Metalsmith](http://metalsmith.io) plugin that adds files last modification
times to their Metalsmith metadata.

[![Build Status](https://travis-ci.org/jkuczm/metalsmith-mtime.svg?branch=master)](https://travis-ci.org/jkuczm/metalsmith-mtime)
[![License: MIT](http://jkuczm.github.io/media/images/license-MIT-blue.svg)](https://github.com/jkuczm/metalsmith-mtime/blob/master/LICENSE)


## Javascript Usage

```js
var mtime = require('metalsmith-mtime');

metalsmith.use(mtime()));
```

That will add a `mtime` property to metadata of each file.
Value of this property will be an instance of `Date`.


## CLI Usage

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
