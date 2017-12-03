'use strict';

const binBuild = require('bin-build');
const log = require('logalot');
const path = require('path');
const pkg = require('../package.json');

log.info('compiling dssim from source');

binBuild.url(`https://github.com/pornel/dssim/archive/${pkg.version}.tar.gz`, [
	'cargo build --release',
])
.then(() => log.success('dssim built successfully'))
.catch(err => log.error(err.stack))
