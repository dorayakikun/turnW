var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false,
});

if (!process.env.NODE_SLACK_BOT_TOKEN) {
    throw new Error('Failed to specify token in environment');
}

// connect the bot to a stream of messages
controller.spawn({
    token: process.env.NODE_SLACK_BOT_TOKEN,
}).startRTM();

controller.hears(['(\\\\[\w\\\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF]*|"\\\\[\w\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF].*")'], ['ambient'], function(bot, message) {
    var matches = message.text.match(/(\\\\[\w\\\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF]*|"\\\\[\w\.\u3041-\u3096\u30A1-\u30FA\u3400-\u9FFF\uF900-\uFAFF].*")/);


    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'crab',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        bot.reply(message, `
file:${matches[0].replace(/\\/g, '/')}
smb:${matches[0].replace(/\\/g, '/')}`);
    });
});