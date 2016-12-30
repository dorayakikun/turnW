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

controller.hears(['(\\\\[\w\\\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF]*|"\\\\[\w\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF].*")'], ['ambient', 'mention'], function(bot, message) {
    var matches = message.text.match(/(\\\\[\w\\\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF]*|"\\\\[\w\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF].*")/);
    bot.reply(message, `
file:${matches[0].replace(/\\/g, '/')}
smb:${matches[0].replace(/\\/g, '/')}`);
});