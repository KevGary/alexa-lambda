const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'project',
        message: `What's your project's name?`,
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: `What's the author's name?`
      },
      {
        type: 'input',
        name: 'lambdaName',
        message: `What's your AWS Lambda function's name?`
      },
      {
        type: 'input',
        name: 'alexaAppId',
        message: `What's your AWS Alexa Skill's application ID?`
      }
    ])
    .then(answers => this.answers = answers);
  }

  writing() {
    const { alexaAppId, author, lambdaName, project } = this.answers;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { author, project }
    );
    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'),
      { alexaAppId, lambdaName }
    );
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );
    this.fs.copy(
      this.templatePath('zip.js'),
      this.destinationPath('zip.js')
    );
  }

  install() {
    this.npmInstall(['adm-zip', 'alexa-sdk', 'zip-dir'], {
      "--save": true,
      "--silent": true
    });
  }
};
