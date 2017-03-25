/*eslint-env es6, node */
'use strict';

const npmPath = require('npm-path');
const CLI_Helper = require('cli-helper').constructor;

class Helper extends CLI_Helper {

    constructor() {
        super();
    }

    getBinPath(command, folder) {
        const self = this;
        let paths = npmPath.getSync();
        let res;
        paths = paths.split(npmPath.SEPARATOR);

        for (let i = 0; i < paths.length; i++) {
            let item = paths[i];
            let path = `${item}/${command}`;
            if (self.isFileExists(path)) {
                res = path;
                break;
            } else if (folder && /\/\.bin$/.test(item)) {
                let alt = item.replace(/\/\.bin$/, '');
                path = `${alt}/${command}`;
                if (self.isPathExists(path)) {
                    res = path;
                    break;
                }
            }
        }

        return res;

    }

}

module.exports = new Helper;
