'use strict';

const fs = require('fs');
const process = require('process');
const { promisify } = require('util');

const AdmZip = require('adm-zip');

const { alexaAppId, lambdaName } = require('./config.json');

const exec = promisify(require('child_process').exec);
const unlink = promisify(fs.unlink);

class Deploy {
  constructor() {
    this.files = ['./config.json', './index.js'];
    this.folders = ['./node_modules'];
    this.zip = new AdmZip();

    process.on('unhandledRejection', error => {
      console.error(`${error} \nSorry!`);
      process.exit(0);
    });
  }

  execute() {
    this.createZip()
      .then(this.uploadZip);
  }

  async createZip() {
    console.info('zipping files for index.zip');

    this.files.forEach(file => this.zip.addLocalFile(file));
    this.folders.forEach(folder => this.zip.addLocalFolder(folder, 'node_modules'));

    try {
      await unlink('./index.zip');
    } catch(e) {
      console.info('skipped removing existing index.zip file');
    }

    this.zip.writeZip('./index.zip');

    console.info('finished zipping files and wrote them to index.zip');

    return Promise.resolve(true);
  }

  async uploadZip() {
    console.info(`uploading index.zip to AWS Lambda ${lambdaName}`);

    const { stdout, stderr } = await exec(`aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://index.zip`);

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    console.info(`successfully uploaded index.zip to AWS Lambda ${lambdaName}`);

    return Promise.resolve(true);
  }
}

const deploy = new Deploy();

deploy.execute();
