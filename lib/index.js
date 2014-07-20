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
  done();
}