module.exports = (controller) => {
  controller.hears(['(\\\\[\w\\\.\-_\\\/\$%~&;　\u3000-\uFAFF\uFF01-\uFF60]*|"\\\\[\w\\\.\-_\\\/\$%~&;　\u3000-\uFAFF\uFF01-\uFF60].*")'], ['direct_message', 'ambient'], function (bot, message) {
    var matches = message.text.match(/(\\\\[\w\\\.\-_\\\/\$%~&;　\u3000-\uFAFF\uFF01-\uFF60]*|"\\\\[\w\\\.\-_\\\/\$%~&;　\u3000-\uFAFF\uFF01-\uFF60].*")/);

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
      if (matches[0].indexOf('\u3000') !== -1) {
        bot.reply(message, `
file:${encodeURI(matches[0].replace(/\\/g, '/'))}

smb:${encodeURI(matches[0].replace(/\\/g, '/'))}`);
        return;
      }
      bot.reply(message, `
file:${matches[0].replace(/\\/g, '/')}
smb:${matches[0].replace(/\\/g, '/')}`);
    });
  });
}