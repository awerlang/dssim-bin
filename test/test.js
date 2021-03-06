/*global afterEach,beforeEach,it*/
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const binBuild = require('bin-build');
const binCheck = require('bin-check');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const tmp = path.join(__dirname, 'tmp');
const pkg = require('../package.json');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('should rebuild the dssim binaries', (done) => {
	binBuild.url(`https://github.com/pornel/dssim/archive/${pkg.version}.tar.gz`, [
		`make DESTDIR=${tmp}${(process.platform === 'darwin' ? '/ USE_COCOA=1' : '/')}`
	])
	.then(() => {
		assert(fs.statSync(path.join(tmp, 'dssim')).isFile());
		done();
	})
	.catch(err => done(err))
});

it('should return path to binary and verify that it is working', (done) => {
	const image = path.join(__dirname, '1x1.png')
	binCheck(require('../'), [image, image])
		.then(() => done())
		.catch(err => done(err));
});
