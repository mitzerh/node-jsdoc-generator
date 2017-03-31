/*eslint-env es6, node */
'use strict';

const npmPath = require('npm-path');
const CLI_Helper = require('cli-helper').constructor;

class Helper extends CLI_Helper {

    constructor() {
        super();

        this._local_npmPath = `${__dirname}/../node_modules`;

    }

    getBinPath(command, folder) {
        const self = this;
        let paths = npmPath.getSync();
        let res;
        paths = paths.split(npmPath.SEPARATOR);
        const local = this._local_npmPath;

        if (this.isPathExists(local)) {
            paths = [local];
        }

        for (let i = 0; i < paths.length; i++) {
            let item = paths[i];
            let path = `${item}/${command}`;

            if (folder) {
                let alt = item;
                if (/\/\.bin$/.test(item)) {
                    alt = item.replace(/\/\.bin$/, '');
                }
                path = `${alt}/${command}`;
                if (self.isPathExists(path)) {
                    res = path;
                    break;
                }
            } else {
                if (self.isFileExists(path)) {
                    res = path;
                    break;
                } else if (self.isFileExists(`${item}/.bin/${command}`)) {
                    res = `${item}/.bin/${command}`;
                    break;
                }
            }

        }

        return res;

    }

}

module.exports = new Helper;
