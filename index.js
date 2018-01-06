var alexa = require('alexa-app');
var _ = require('lodash');

var translate = require('./src/translate');
var defaultDishes = require('./defaultDishes').dishes;
var DatabaseHelper = require('./src/database-helper');
var databaseHelper = new DatabaseHelper();

var skillService = new alexa.app('mavs-menus');
skillService.id = require('./package.json').alexa.applicationId;

skillService.pre = function(request, response, type) {
    databaseHelper.createTable();
};

skillService.launch(function (req, res) {
    res.say(translate('intro')).reprompt(translate('repromptIntro')).shouldEndSession(false);
});

skillService.intent('SaveIntent', {
    "slots": {
        "USERDISH": "MENUIDEAS"
    },
    "utterances": [
        "{save|store|bank} {-|USERDISH}",
        "{save|store|bank} {-|USERDISH} in {the|my|our|your} {food|menu|recipe} {bank|store|list|database}"
    ]
}, function(req, res) {
    var dishToSave = req.slot('USERDISH');
    return databaseHelper.saveDish(req.userId, dishToSave)
        .then(function() {
            res.say(translate('saveSuccess'));
            res.shouldEndSession(true);
        }).catch(function(error) {
            res.say(translate('saveError'));
            console.log(error);
            res.shouldEndSessiont(true);
        });
});

skillService.intent('ReadIntent', {
    "slots": {},
    "utterances": [
        "{suggest|read|give} {a|some} {menu|menus|food|dish|dishes|recipe|recipes|idea|ideas|suggestion|suggestions} to {me|us}",
        "{suggest|read|give} {me|us} {a|some} {menu|menus|food|recipe|recipes|idea|ideas|suggestion|suggestions}",
        "{suggest|read|give} {me|us} {a|some} {meal|menu|menus|food|recipe|recipes} {idea|ideas|suggestion|suggestions}"
    ]
}, function(req, res) {
    return databaseHelper.readDishes(req.userId)
        .then(function(dbDishes) {
            var allDishes = defaultDishes;
            if (dbDishes) {
                allDishes = defaultDishes.concat(dbDishes);
            }
            var shuffledDishes = _.shuffle(allDishes);
            var suggestedDish = shuffledDishes[0];
            res.say(translate('suggestion') + suggestedDish + '?');

            var remainingDishes = shuffledDishes.slice(1);
            res.session('remaining-dishes', remainingDishes);

            res.session('isReading', true);
            res.shouldEndSession(false);
        }).catch(function(error) {
            console.error(error);
        });
});

var readAnotherSuggestion = function(req, res) {
    if (req.session('isReading')) {
        var remainingDishes = req.session('remaining-dishes');
        if (remainingDishes.length) {
            res.say(translate('subsequentSuggestions') + remainingDishes[0] + '?');
            res.session('remaining-dishes', req.session('remaining-dishes').slice(1));
            res.shouldEndSession(false);
        } else {
            res.say(translate('noMoreSuggestions'));
            res.shouldEndSession(true);
        }
    } else {
        res.say(translate('error'));
        res.shouldEndSession(true);
    }
}

skillService.intent('AMAZON.NoIntent', readAnotherSuggestion);
skillService.intent('AMAZON.MoreIntent', readAnotherSuggestion);

skillService.intent('AMAZON.YesIntent', function(req, res) {
    if (req.session('isReading')) {
        res.say(translate('successfulSuggestion'));
        res.shouldEndSession(true);
    } else {
        res.say(translate('error'));
        res.shouldEndSession(true);
    }
});

skillService.intent('AMAZON.HelpIntent', function(req, res) {
    res.say(translate('help'));
    res.shouldEndSession(true);
});

skillService.intent('AMAZON.StopIntent', function(req, res) {
    res.say(translate('stop'));
    res.shouldEndSession(true);
});

module.exports = skillService;
