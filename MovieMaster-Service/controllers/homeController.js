const ApiAiApp = require('actions-on-google').ApiAiApp;
const { sprintf } = require('sprintf-js');
var movieService = require('../services/tmdbService');

const Actions = {
  UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
  TELL_FACT: 'tell.fact',
  TELL_CAT_FACT: 'tell.cat.fact'
};

/** API.AI Parameters {@link https://api.ai/docs/actions-and-parameters#parameters} */
const Parameters = {
  CATEGORY: 'category'
};
/** API.AI Contexts {@link https://api.ai/docs/contexts} */
const Contexts = {
  FACTS: 'choose_fact-followup',
  CATS: 'choose_cats-followup'
};
/** API.AI Context Lifespans {@link https://api.ai/docs/contexts#lifespan} */
const Lifespans = {
  DEFAULT: 5,
  END: 0
};






var homeController = function () {

  /**
 * Set up app.data for use in the action
 * @param {ApiAiApp} app ApiAiApp instance
 */
  const initData = app => {
    /** @type {AppData} */
    const data = app.data;
    if (!data.facts) {
      data.facts = {
        content: {},
        cats: null
      };
    }
    return data;
  };

  var getResponse = function (req, res, callback) {
    //    res.send("hello world");

    const app = new ApiAiApp({ request: req, response: res });
    console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    app.handleRequest(actionMap);
    //callback(null, "listening");
  }

  const tellCatFact = app => {
    const data = initData(app);
    if (!data.facts.cats) {
      data.facts.cats = strings.cats.facts.slice();
    }
    const catFacts = data.facts.cats;
    const fact = getRandomFact(catFacts);
    /** @type {boolean} */
    const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    if (!fact) {
      // Add facts context to outgoing context list
      app.setContext(Contexts.FACTS, Lifespans.DEFAULT, {});
      // Replace outgoing cat-facts context with lifespan = 0 to end it
      app.setContext(Contexts.CATS, Lifespans.END, {});
      if (!screenOutput) {
        return app.ask(strings.transitions.cats.heardItAll, strings.general.noInputs);
      }
      const richResponse = app.buildRichResponse()
        .addSimpleResponse(strings.transitions.cats.heardItAll, strings.general.noInputs)
        .addSuggestions(strings.general.suggestions.confirmation);

      return app.ask(richResponse);
    }
    const factPrefix = sprintf(strings.cats.factPrefix, getRandomValue(strings.cats.sounds));
    if (!screenOutput) {
      // <speak></speak> is needed here since factPrefix is a SSML string and contains audio
      return app.ask(`<speak>${concat([factPrefix, fact, strings.general.nextFact])}</speak>`, strings.general.noInputs);
    }
    const image = getRandomValue(strings.cats.images);
    const [url, name] = image;
    const card = app.buildBasicCard(fact)
      .setImage(url, name)
      .addButton(strings.general.linkOut, strings.cats.link);

    const richResponse = app.buildRichResponse()
      .addSimpleResponse(`<speak>${factPrefix}</speak>`)
      .addBasicCard(card)
      .addSimpleResponse(strings.general.nextFact)
      .addSuggestions(strings.general.suggestions.confirmation);

    app.ask(richResponse, strings.general.noInputs);
  };

  const unhandledDeepLinks = app => {
    /** @type {string} */
    const rawInput = app.getRawInput();
    const response = sprintf(strings.general.unhandled, rawInput);
    /** @type {boolean} */
    const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    if (!screenOutput) {
      return app.ask(response, strings.general.noInputs);
    }
    const suggestions = Object.values(strings.categories).map(category => category.suggestion);
    const richResponse = app.buildRichResponse()
      .addSimpleResponse(response)
      .addSuggestions(suggestions);

    app.ask(richResponse, strings.general.noInputs);
  };

  const tellFact = app => {
    // Connect to movie service
    movieService.getRecentMovies(function (err, results) {
      // Get results array
      app.tell(`Movies currently running are ${results.join(', ')}`)
      // Return the response
    });

    // app.tell('strings.general.heardItAll');
    // const data = initData(app);
    // const facts = data.facts.content;
    // for (const category of Object.values(strings.categories)) {
    //   // Initialize categories with all the facts if they haven't been read
    //   if (!facts[category.category]) {
    //     facts[category.category] = category.facts.slice();
    //   }
    // }
    // if (Object.values(facts).every(category => !category.length)) {
    //   // If every fact category facts stored in app.data is empty
    //   return app.tell(strings.general.heardItAll);
    // }
    // const parameter = Parameters.CATEGORY;
    // /** @type {string} */
    // const factCategory = app.getArgument(parameter);
    // /** @type {boolean} */
    // const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    // const category = strings.categories[factCategory];
    // if (!category) {
    //   /** @type {string} */
    //   const action = app.getIntent();
    //   return console.error(`${parameter} parameter is unrecognized or not provided by API.AI ${action} action`);
    // }
    // const fact = getRandomFact(facts[category.category]);
    // if (!fact) {
    //   const otherCategory = Object.values(strings.categories).find(other => other !== category);
    //   if (!otherCategory) {
    //     return console.error(`No other category besides ${category.category} exists`);
    //   }
    //   if (!screenOutput) {
    //     return app.ask(noFactsLeft(app, factCategory, otherCategory.category), strings.general.noInputs);
    //   }
    //   const suggestions = [otherCategory.suggestion];
    //   const catFacts = data.facts.cats;
    //   if (!catFacts || catFacts.length) {
    //     // If cat facts not loaded or there still are cat facts left
    //     suggestions.push(strings.cats.suggestion);
    //   }
    //   const richResponse = app.buildRichResponse()
    //     .addSimpleResponse(noFactsLeft(app, factCategory, otherCategory.category))
    //     .addSuggestions(suggestions);

    //   return app.ask(richResponse, strings.general.noInputs);
    // }
    // const factPrefix = category.factPrefix;
    // if (!screenOutput) {
    //   return app.ask(concat([factPrefix, fact, strings.general.nextFact]), strings.general.noInputs);
    // }
    // const image = getRandomValue(strings.content.images);
    // const [url, name] = image;
    // const card = app.buildBasicCard(fact)
    //   .addButton(strings.general.linkOut, strings.content.link)
    //   .setImage(url, name);

    // const richResponse = app.buildRichResponse()
    //   .addSimpleResponse(factPrefix)
    //   .addBasicCard(card)
    //   .addSimpleResponse(strings.general.nextFact)
    //   .addSuggestions(strings.general.suggestions.confirmation);

    // app.ask(richResponse, strings.general.noInputs);
  };
  const actionMap = new Map();
  actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
  actionMap.set(Actions.TELL_FACT, tellFact);
  actionMap.set(Actions.TELL_CAT_FACT, tellCatFact);

  return {
    getResponse: getResponse
  }

};



module.exports = homeController();
