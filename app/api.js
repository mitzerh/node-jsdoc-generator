/*eslint-env es6, node */
'use strict';

const config = require('app/config');
const Helper = require('app/helper');
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
        _.merge(json, {
            templates: {
                'default': {
                    layoutFile: this._LAYOUT_PATH + '/layout.tmpl'
                }
            }
        });

        // write
        this._CONFIG_FILE = this._DEST_PATH + '/conf.json';
        Helper.createDir(this._DEST_PATH);
        Helper.writeFile(configFile, JSON.stringify(json));

    }

    generate() {

        /*
        [{
            name: 'my.app',
            source: '/path/to/app/folder'
        }]
         */
        const self = this;
        const configFile = this._CONFIG_FILE;
        const layoutPath = this._LAYOUT_PATH;
        const destFolder = this._DOC_PATHS;
        const modulesPath = config.dir.base + '/node_modules';
        const jsdocExec = Helper.getNodeBin('jsdoc', modulesPath);

        this._DOC_PATHS.forEach(function(info){
            const sourcePath = info.source;
            const destPath = destFolder + '/' + info.name;

            // clean dir
            if (Helper.isPathExists(destPath)) {
                Helper.shellCmd('rm -rf ./' + info.folder, destFolder);
            }

            let cmd = [
                `${jsdocExec} ${sourcePath}`,
                `--configure ${configFile}`,
                `-d ${destPath}`,
                `-t ${modulesPath}/docdash`
            ];

            // if there's a readme
            if (Helper.isFileExists(`${sourcePath}/readme.md`)) {
                cmd.push(`--readme ${sourcePath}/readme.md`);
            } else if (Helper.isFileExists(`${sourcePath}/README.md`)) {
                cmd.push(`--readme ${sourcePath}/README.md`);
            }

            log(cmd.join(' '));

            // const res = Helper.shellCmd(cmd.join(' '), null);
            //
            // if (res.indexOf('error') > -1) {
            //     log('[jsdoc.error]'.red);
            //     log(res);
            // } else {
            //     // copy custom styles/scripts
            //     Helper.shellCmd([
            //         `cp -r ${layoutPath}/scripts/* ${destPath}/scripts/`,
            //         `cp -r ${layoutPath}/styles/* ${destPath}/styles/`
            //     ].join(' && '));
            // }

        });

    }


}

module.exports = API;
