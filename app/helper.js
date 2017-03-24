/*eslint-env es6, node */
'use strict';

const CLI_Helper = require('cli-helper').constructor;

class Helper extends CLI_Helper {

    constructor() {
        super();
    }

    getNodeBin(name, modules) {
        const type = (this.isPathExists(modulesPath + '/.bin')) ? 'local' : 'global';
        let ret;
        if (type === 'global') {
            ret = '/' + [name, 'bin', name].join('/');
        } else {
            ret = '/.bin/' + name;
        }
        return (modules || '') + ret;
    }

}

module.exports = new Helper;
