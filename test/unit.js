/* global describe, it */

var fs = require('fs');
var should = require('should');
var sinon = require('sinon');

var addAllMtimes = require('..')();

var fakeMetalsmith = {
  source: function () {
    return '';
  }
};

describe('metalsmith-mtime addAllMtimes', function () {
  it('should add file mtime to its metadata', function (done) {

    var mtime = new Date(2014, 7, 20);
    var files = {
      'fakeFileName': { contents: 'Fake contents.' }
    };

    sinon.stub(fs, 'stat').callsArgWith(1, null, { mtime: mtime });

    addAllMtimes(files, fakeMetalsmith, testFiles);

    function testFiles(err) {
      fs.stat.restore();

      should.not.exist(err);

      files.should.have.property('fakeFileName')
        .which.have.property('mtime', mtime);

      done();
    }
  });

  it('should add files mtimes to their metadata', function (done) {

    var mtime1 = new Date(2014, 7, 16);
    var mtime2 = new Date(2014, 7, 17);
    var files = {
      'fakeFileName1': { contents: 'Fake contents 1.' },
      'fakeFileName2': { contents: 'Fake contents 2.' }
    };

    sinon.stub(fs, 'stat')
      .withArgs('fakeFileName1').callsArgWith(1, null, { mtime: mtime1 })
      .withArgs('fakeFileName2').callsArgWith(1, null, { mtime: mtime2 });

    addAllMtimes(files, fakeMetalsmith, testFiles);

    function testFiles(err) {
      fs.stat.restore();

      should.not.exist(err);

      files.should.have.property('fakeFileName1')
        .which.have.property('mtime', mtime1);
      files.should.have.property('fakeFileName2')
        .which.have.property('mtime', mtime2);

      done();
    }
  });


  it('should pass generic fs errors', function (done) {

    var files = {
      'fakeFileName': { contents: 'Fake contents.' }
    };

    sinon.stub(fs, 'stat')
      .withArgs('fakeFileName').callsArgWith(1, new Error());

    addAllMtimes(files, fakeMetalsmith, testFiles);

    function testFiles(err) {
      /* jshint expr: true */

      fs.stat.restore();

      err.should.be.an.Error;

      files.should.have.property('fakeFileName')
        .which.not.have.property('mtime');

      done();
    }
  });


  it('should not break when there is more than one error', function (done) {

    var files = {
      'fakeFileName1': { contents: 'Fake contents 1.' },
      'fakeFileName2': { contents: 'Fake contents 1.' }
    };

    sinon.stub(fs, 'stat')
      .withArgs('fakeFileName1').callsArgWith(1, new Error())
      .withArgs('fakeFileName2').callsArgWith(1, new Error());

    addAllMtimes(files, fakeMetalsmith, testFiles);

    function testFiles(err) {
      /* jshint expr: true */

      fs.stat.restore();

      err.should.be.an.Error;

      files.should.have.property('fakeFileName1')
        .which.not.have.property('mtime');
      files.should.have.property('fakeFileName2')
        .which.not.have.property('mtime');

      done();
    }
  });


  it('should skip non-existing files', function (done) {

    var files = {
      'nonExistingFile': { contents: 'Fake contents.' }
    };

    function FakeENOENTError(message) {
      this.name = 'FakeENOENTError';
      this.message = message || 'Fake ENOENT Error';
      this.code = 'ENOENT';
      this.errno = 34;
    }
    FakeENOENTError.prototype = new Error();
    FakeENOENTError.prototype.constructor = FakeENOENTError;

    sinon.stub(fs, 'stat')
      .withArgs('nonExistingFile').callsArgWith(1, new FakeENOENTError());

    addAllMtimes(files, fakeMetalsmith, testFiles);

    function testFiles(err) {
      fs.stat.restore();

      should.not.exist(err);

      files.should.have.property('nonExistingFile')
        .which.not.have.property('mtime');

      done();
    }
  });
});
