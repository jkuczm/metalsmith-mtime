/* global describe, it */

var fs = require('fs');
var path = require('path');
var should = require('should');
var Metalsmith = require('metalsmith');
var mtime = require('..');

describe('acceptance: metalsmith-mtime', function () {
  it('should add files mtimes to their metadata', function (done) {
    /* jshint newcap: false */

    var date1 = new Date(2014, 7, 17);
    var date2 = new Date(2014, 7, 18);
    var date3 = new Date(2014, 7, 19);
    var srcFilePath = path.join(__dirname, 'fixture/src/index.html');

    fs.utimesSync(path.join(__dirname, 'fixture/src/f1.html'), date3, date1);
    fs.utimesSync(path.join(__dirname, 'fixture/src/f2.html'), date3, date2);

    Metalsmith('test/fixture')
      .use(mtime())
      .build(testFilesMtime);

    function testFilesMtime(err, files) {
      should.not.exist(err);

      files.should.have.property('f1.html')
        .which.have.property('mtime', date1);
      files.should.have.property('f2.html')
        .which.have.property('mtime', date2);

      done();
    }
  });


  it('should not report errors for non-existing files', function (done) {
    /* jshint newcap: false */

    function fakeRougePlugin(files, metalsmith, done) {
      setImmediate(done);

      files['nonExisting.html'] = {
        contents: 'Mock contents.'
      };
    }

    Metalsmith('test/fixture')
      .use(fakeRougePlugin)
      .use(mtime())
      .build(testNoError);

    function testNoError(err, files) {
      should.not.exist(err);
      done();
    }
  });
});
