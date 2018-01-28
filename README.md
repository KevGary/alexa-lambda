A Yeoman generator that allows you to quickly create and deploy an AWS Lambda function for your Alexa skill.

# Prerequisites

1. Create an Alexa Skill in [Amazon Developer Services](https://developer.amazon.com/).
2. Create a Lambda function in [Amazon Web Services](https://aws.amazon.com/).

Configure them to work together. [Here's how](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html).

Once configured, you'll need to develop the actual AWS Lambda function. That's where this package comes to the rescue!

# Installation

Using npm:

```bash
npm install -g yo
npm install -g generator-alexa-lambda
```

# Usage

### Generate Project

```bash
yo alexa-lambda
```

This will scaffold a project folder that has everything you need to develop and deploy an AWS Lambda function for your Alexa Skill. It works out of the box.

### Develop

Develop your Alexa Skill's intent handlers in `index.js` using the [aws-sdk](https://www.npmjs.com/package/aws-sdk) package, which is pre-installed by this generator.

Create and include new JavaScript files and npm packages in your project as you like. The deploy command will include and upload all of them to your AWS Lambda function.

### Deploy

```bash
npm run deploy
```
