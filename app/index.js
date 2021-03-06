'use strict';

const process = require('process');

const Generator = require('yeoman-generator');

const { notEmptyNoSpaces, noSpaces } = require('./validate.js');

class AlexaLambdaGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'project',
        message: 'Project name:',
        validate: notEmptyNoSpaces
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Git repository url:',
        validate: noSpaces
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description name:'
      },
      {
        type: 'input',
        name: 'lambdaName',
        message: `AWS Lambda function's name:`,
        validate: notEmptyNoSpaces
      },
      {
        type: 'input',
        name: 'alexaAppId',
        message: `AWS Alexa Skill's application ID:`,
        validate: notEmptyNoSpaces
      }
    ])
    .then(answers => this.answers = answers);
  }

  writing() {
    const { alexaAppId, author, description, lambdaName, project } = this.answers;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${project}/package.json`),
      { author, project }
    );
    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath(`${project}/config.json`),
      { alexaAppId, lambdaName }
    );
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath(`${project}/index.js`)
    );
    this.fs.copy(
      this.templatePath('deploy.js'),
      this.destinationPath(`${project}/deploy.js`)
    );
  }

  install() {
    const { project } = this.answers;

    process.chdir(`${process.cwd()}/${project}`);

    this.npmInstall(['adm-zip', 'alexa-sdk'], {
      '--save': true,
      '--silent': true
    });
  }

  end() {
    console.info('\nhappy coding!');
  }
};

module.exports = AlexaLambdaGenerator;
