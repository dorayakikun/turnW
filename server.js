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

controller.hears(['(\\\\[\w\\\.\-_\\\/\$%~\u3040-\uFAFF]*|"\\\\[\w\.\-_\\\/\$%~\u3040-\uFAFF].*")'], ['ambient'], function (bot, message) {
    var matches = message.text.match(/(\\\\[\w\\\.\-_\\\/\$%~\u3040-\uFAFF]*|"\\\\[\w\.\-_\\\/\$%~\u3040-\uFAFF].*")/);

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'crab',
    }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, `
file:${matches[0].replace(/\\/g, '/')}
smb:${matches[0].replace(/\\/g, '/')}`);
    });
});