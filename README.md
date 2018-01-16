This Yeoman generator allows you to quickly create and deploy an AWS Lambda function for your Alexa skill.

#Prerequisites

1. An Alexa Skill.
2. An AWS Lambda function.

Configure them to work together. [Here's how](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html).

Once configured, you're ready to develop the actual AWS Lambda function code!

#Installation

Using npm:

```bash
npm install -g yo
npm install -g generator-alexa-lambda
```

#Usage

##Generate Project

```bash
yo alexa-lambda
```

This will scaffold a project folder that has everything you need to develop and deploy an AWS Lambda Skill for your Alexa Skill. It works out of the box.

Add your intent handlers to `index.js` and deploy with a single command.

##Deploy

```bash
npm run deploy
```

https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html