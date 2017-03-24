/*eslint-env es6, node */
'use strict';

const dir = __dirname + '/..';
const app_dir = __dirname;

const Config = (() => {

    let config = {};

    /**
     * directories
     */
    config.dir = {
        base: dir,
        app: app_dir,
        dest: dir + '/dest',
        jsdoc: app_dir + '/jsdoc'
    };

    return config;

})();

module.exports = Config;
