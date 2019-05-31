/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const bgImage = new Alexa.ImageHelper()
        .addImageInstance("https://s3.amazonaws.com/alexa-skills-content/alexa-ug-blr/display-templates/bg.png")
        .getImage();
const title = 'ALEXA-UG-BLR';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const primary = 'Welcome to Alexa Bangalore Meetup!. I am your work in-progress skill. ';
    const secondary = 'Currently I can recommend you places to visit in town. ';
    const tertiary = 'To continue please tell me your name?';
    const speechText = primary+secondary+tertiary;
    const repromptText = tertiary;

    // For display
    if (supportsDisplay(handlerInput)) {
      handlerInput.responseBuilder.addRenderTemplateDirective({
        type: 'BodyTemplate1',
        backButton: 'hidden',
        backgroundImage: bgImage,
        title,
        textContent: new Alexa.RichTextContentHelper()
                      .withPrimaryText("<div align='center'>"+primary+"</div>")
                      .withSecondaryText("<div align='center'>"+secondary+"</div>")
                      .withTertiaryText("<div align='center'>"+tertiary+"</div>")
                      .getTextContent(),
      });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  },
};

const WelcomeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WelcomeIntent';
  },
  handle(handlerInput) {
    let name = handlerInput.requestEnvelope.request.intent.slots.name.value;
    let zone = handlerInput.requestEnvelope.request.intent.slots.zone.value;

    console.log(name+"-"+zone+"-"+ handlerInput.requestEnvelope.request.dialogState);
    if(!name && !zone){
      return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse();
    } else if (name && !zone){
      const primary = `Hey ${name}, good to meet you. `;
      const secondary = 'which part of bangalore you stay in? ';
      const options = 'Tell me if its North, South, East or West';

      const speechText = primary+secondary;
      const repromptText = secondary+options;

      // For display
      const image = new Alexa.ImageHelper()
                      .addImageInstance("https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/wc-traffic.jpg")
                      .getImage();
      if (supportsDisplay(handlerInput)) {
        handlerInput.responseBuilder.addRenderTemplateDirective({
          type: 'BodyTemplate2',
          backButton: 'hidden',
          backgroundImage: bgImage,
          image,
          title,
          textContent: new Alexa.RichTextContentHelper()
                        .withPrimaryText("<div align='center'>"+primary+"</div>")
                        .withSecondaryText("<div align='center'>"+secondary+"</div>")
                        .withTertiaryText("<div align='center'>Tell me if its<br/>North<br/>South<br/>East<br/>West</div>")
                        .getTextContent(),
        });
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(repromptText)
        .getResponse();
    } else {
      let speechText;
      let imgLocation;
      if(zone == 'north'){
        imgLocation = "https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/nandiHills.jpg";
        speechText = 'I recommand Nandi Hills. Its a wonderful place for a short road trip with your loved ones';
      } else if (zone == 'south'){
        imgLocation = "https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/bhavan.jpg";
        speechText = 'Hmm. South Bangalore is know for temples and tasty food. Try the basavanagudi temples and tasty dosa @ Vidyarthi Bhavan';
      } else if (zone == 'east'){
        imgLocation = "https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/mall.jpg";
        speechText = 'East bangalore is known for its larvish malls and multiplexs. Please try the Phoenix market city mall';    
      } else {
        imgLocation = "https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/tree.jpg";
        speechText = 'I suggest you to visit the 400 years old Big Banyan tree. The single plant covers over 3 acres of land and is one of the largest of its kinds';
      }
      const image = new Alexa.ImageHelper()
                      .addImageInstance(imgLocation)
                      .getImage();
      // For display
      if (supportsDisplay(handlerInput)) {
        handlerInput.responseBuilder.addRenderTemplateDirective({
          type: 'BodyTemplate3',
          backButton: 'hidden',
          backgroundImage: bgImage,
          image,
          title,
          textContent: new Alexa.RichTextContentHelper()
                        .withPrimaryText("<div align='center'>"+speechText+"</div>")
                        .getTextContent(),
        });
      }

      return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'To continue please tell me your name?';

    // For display
    if (supportsDisplay(handlerInput)) {
      handlerInput.responseBuilder.addRenderTemplateDirective({
        type: 'BodyTemplate6',
        backButton: 'hidden',
        backgroundImage: bgImage,
        bgImage,
        title,
        textContent: new Alexa.RichTextContentHelper()
                      .withPrimaryText("<div align='center'>Help: "+speechText+"</div>")
                      .getTextContent(),
      });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const image = new Alexa.ImageHelper()
                      .addImageInstance("https://alexa-skills-content.s3.amazonaws.com/alexa-ug-blr/display-templates/gb.jpg")
                      .getImage();
    if (supportsDisplay(handlerInput)) {
      handlerInput.responseBuilder.addRenderTemplateDirective({
        type: 'BodyTemplate7',
        backButton: 'hidden',
        backgroundImage: bgImage,
        image
      });
    }

    return handlerInput.responseBuilder
      .speak('Hope you liked the information. Goodbye!')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I could not understand. Please say again.';

    // For display
    if (supportsDisplay(handlerInput)) {
      handlerInput.responseBuilder.addRenderTemplateDirective({
        type: 'BodyTemplate1',
        backButton: 'hidden',
        backgroundImage: bgImage,
        bgImage,
        title,
        textContent: new Alexa.RichTextContentHelper()
                      .withPrimaryText("<div align='center'>"+speechText+"</div>")
                      .getTextContent(),
      });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    WelcomeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
