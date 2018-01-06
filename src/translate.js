var dictionary = {
    intro: "Hello Mav, welcome to your menu bank. Would you like to add a dish or hear some suggestions?",
    repromptIntro: "I can store dishes that you like and read them back to you when you need some meal inspiration. <emphasis level='moderate'>Now,</emphasis> would you like to save a dish or hear some suggestions?",

    saveSuccess: "Ooh that sounds good. I will make sure to save that one for later",
    saveError: "Sorry, there was an error whilst saving that dish. Could you try again, please?",

    suggestion: "How about ",
    subsequentSuggestions: "Or ",
    noMoreSuggestions: "Sorry, that's all I've got. Ask me to add a dish to build up your bank.",
    successfulSuggestion: "Yayy <break strength='medium'/> glad I could be of service. <amazon:effect name='whispered'>Remember to make enough for all your friends</amazon:effect>",

    error: "Sorry, an error has occured. Please ask me to save a dish or read some suggestions",

    help: "I can store dishes that you like and read them back to you when you need some meal inspiration. If you want me to save pasta then just say <break strength='medium'/> Alexa, ask <emphasis level='moderate'>Mavs Menus</emphasis> to save pasta to my menu bank. <break strength='strong'/> Then if you want inspiration, just say <break strength='medium'/> Alexa, ask <emphasis level='moderate'>Mavs Menus</emphasis> to suggest some dishes to me.",

    stop: "Okay, catch you later."
};

var translate = function (key) {
    return dictionary[key];
};

module.exports = translate;