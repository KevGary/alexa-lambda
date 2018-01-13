'use strict';

const Alexa = require('alexa-sdk');

const { alexaAppId } = require('./config.json');

const handlers = {
  'LaunchRequest': function() {

  },
  'SessionEndedRequest': function() {

  },
  'AMAZON.HelpIntent': function() {

  }
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.appId = alexaAppId;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
