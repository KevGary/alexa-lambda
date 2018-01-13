'use strict';

const alexa = require('alexa-sdk');

const config = require('./config.json');

class AlexaLambda {
  constructor() {
    this = { ...this, ...config };
  }

  handler(event, context) {
    const alexa = alexa.handler(event, context);
    alexa.appId = this.alexAppId;
    alexa.registerHandlers(this.getHandlers());
    alexa.execute();
  }

  getHandlers() {
    return {
      'LaunchRequest': function() {
        this.emit(':tell', 'Welcome!');
      }
    };
  }
}

const alexaLambda = new AlexaLambda();

exports.handler = alexaLambda.handler;
