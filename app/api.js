/*eslint-env es6, node */
'use strict';

const config = require('./config');
const Helper = require(config.dir.app + '/helper');
const npmRun = require('npm-run');
const npmPath = require('npm-path');
const _ = require('lodash');
const log = console.log;

class API {

    constructor(props) {

        if (!props) { process.exit(1); }

        // destination to render docs
        this._DEST_PATH = props.dest;
        this._DOC_PATHS = props.paths;
        this._LAYOUT_PATH = props.layout || config.dir.jsdoc;

        // load default json
        this._CONF_JSON = JSON.parse(Helper.readFile(config.dir.app + '/jsdoc.json'));

        // custom layout
        _.merge(this._CONF_JSON, {
            templates: {
                'default': {
                    layoutFile: this._LAYOUT_PATH + '/layout.tmpl'
                }
            }
        });

        // write
        this._CONFIG_FILE = this._DEST_PATH + '/conf.json';
        Helper.createDir(this._DEST_PATH);
        Helper.writeFile(this._CONFIG_FILE, JSON.stringify(this._CONF_JSON));

    }

    generate(callback) {
        /*
        [{
            name: 'my.app',
            source: '/path/to/app/folder'
        }]
         */
        const self = this;
        const configFile = this._CONFIG_FILE;
        const destPath = this._DEST_PATH;
        const layoutPath = this._LAYOUT_PATH;
        const jsdocPath = Helper.getBinPath('jsdoc');
        const docDashPath = Helper.getBinPath('docdash', true);

        this._DOC_PATHS.forEach(function(info){
            const sourcePath = info.source;
            const outputPath = destPath + '/' + info.name;

            // clean dir
            if (Helper.isPathExists(destPath)) {
                Helper.shellCmd('rm -rf ./' + info.folder, outputPath);
            }

            let cmd = [
                `jsdoc ${sourcePath}`,
                `--configure ${configFile}`,
                `-d ${outputPath}`,
                `-t ${docDashPath}`
            ];

            // if there's a readme
            if (Helper.isFileExists(`${sourcePath}/readme.md`)) {
                cmd.push(`--readme ${sourcePath}/readme.md`);
            } else if (Helper.isFileExists(`${sourcePath}/README.md`)) {
                cmd.push(`--readme ${sourcePath}/README.md`);
            }

            cmd = cmd.join(' ');
            log('[jsdoc] run:\n', cmd);

            const res = npmRun.sync(cmd);

            if (res.indexOf('error') > -1) {
                log('[jsdoc.error]'.red);
                log(res);
            } else {
                // copy custom styles/scripts
                Helper.shellCmd([
                    `cp -r ${layoutPath}/scripts/* ${destPath}/scripts/`,
                    `cp -r ${layoutPath}/styles/* ${destPath}/styles/`
                ].join(' && '));
                log('\n[jsdoc] generated!');
            }
        });

        if (typeof callback === 'function') {
            callback();
        }
    }


}

module.exports = API;
