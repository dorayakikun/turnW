var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false,
});

if (!process.env.NODE_SLACK_BOT_TOKEN) {
    throw new Error('Error: specify token in environment');
}

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.NODE_SLACK_BOT_TOKEN,
}).startRTM();

controller.hears('(\\\\[\w\\\.]*|"\\\\[\w\.].*")', function(bot, message) {
    var matches = message.text.match(/(\\\\[\w\\\.]*|"\\\\[\w\.].*")/);
    bot.reply(message, matches[0]);
});

