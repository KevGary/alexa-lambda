'use strict';

const Alexa = require('alexa-sdk');

const { alexAppId } = require('./config.json');

const getHandlers = () => {
  return {
    'LaunchRequest': function() {
      this.emit(':tell', 'Welcome!');
    },
    'Hello': function() {
      this.emit(':tell', 'Hello!');
    }
  };
};

const handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = alexAppId;
  alexa.registerHandlers(getHandlers());
  alexa.execute();
};

exports.handler = handler;
