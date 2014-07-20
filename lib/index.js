var fs = require('fs');
var path = require('path');
var each = require('async').each;
var debug = require('debug')('metalsmith-mtime');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * A Metalsmith plugin that adds files mtimes to their metadata.
 *
 * @return {Function}
 */
function plugin() {
  return addAllMtimes;
}


function addAllMtimes(files, metalsmith, done) {

  // File system will be accessed for each element so iterate in parallel.
  each(Object.keys(files), getAddMtime, done);

  function getAddMtime(file, done) {
    fs.stat(path.join(metalsmith.source(), file), addMtime);

    function addMtime(err, stats) {
      if (err) {
        return done(err);
      }

      debug('mtime of file %s is %s', file, stats.mtime);
      files[file].mtime = stats.mtime;
      done();
    }
  }
}
