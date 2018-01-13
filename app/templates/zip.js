'use strict';

const { exec } = require('child_process');
const fs = require('fs');

const AdmZip = require('adm-zip');
const zipdir = require('zip-dir');

const { alexaAppId, lambdaName } = require('./config.json');

const zip = new AdmZip();
const paths = ['./config.json', './index.js', './package.json'];

paths.forEach(path => {
  zip.addLocalFile(path);
});

zipdir('./node_modules', {
  each: path => console.log(path)
}, (err) => {
  if (err) {
    console.error(`Error ${err}`);
  }
});

if (fs.existsSync('./index.zip')) {
  fs.unlinkSync('./index.zip');
}

zip.writeZip('./index.zip');

exec(`aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://index.zip`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
