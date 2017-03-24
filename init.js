/*eslint-env es6, node */
'use strict';

const Helper = require('cli-helper').instance;
const modulePath = `${__dirname}/node_modules`;

if (Helper.isPathExists(`${modulePath}/app`)) {
    Helper.shellCmd('rm app', modulePath);
}
// create a symlink
Helper.shellCmd('ln -s ../app app', modulePath);
