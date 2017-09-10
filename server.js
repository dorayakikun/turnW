var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false,
    retry: 10,
});

if (!process.env.NODE_SLACK_BOT_TOKEN) {
    throw new Error('Failed to specify token in environment');
}

require('./indexController')(controller);

// connect the bot to a stream of messages
var bot = controller.spawn({
    token: process.env.NODE_SLACK_BOT_TOKEN,
});

bot.startRTM((err, bot, res) => {
  if (err)
    throw new Error('Could not connect to Slack');
});
