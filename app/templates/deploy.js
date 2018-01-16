'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const process = require('process');

const AdmZip = require('adm-zip');

class Deploy {
  constructor() {
    this.config = require('./config.json');
    this.files = ['./config.json', './index.js'];
    this.folders = ['./node_modules'];
    this.zip = new AdmZip();

    process.on('unhandledRejection', Deploy.errorHandler);
    process.on('uncaughtException', Deploy.errorHandler);
  }

  static errorHandler(error) {
    console.error(`${error} \nSorry!`);
    process.exit(0);
  }

  execute() {
    this.createZip();
    this.uploadZip((error, stdout, stderr) => {
      if (error) {
        return Deploy.errorHandler(error);
      }
      console.info(`\nsuccessfully uploaded index.zip to AWS Lambda ${this.config.lambdaName}`);
    });
  }

  createZip() {
    console.info('\ncreating zip file for project');

    this.files.forEach(file => this.zip.addLocalFile(file));
    this.folders.forEach(folder => this.zip.addLocalFolder(folder, 'node_modules'));

    if (!fs.existsSync('./index.zip')) {
      fs.unlinkSync('./index.zip');
    }

    this.zip.writeZip('./index.zip');
  }

  uploadZip(callback) {
    console.info(`\nuploading zip file to AWS Lambda ${this.config.lambdaName}`);

    exec(`aws lambda update-function-code --function-name ${this.config.lambdaName} --zip-file fileb://index.zip`, callback);
  }
}

const deploy = new Deploy();

deploy.execute();
