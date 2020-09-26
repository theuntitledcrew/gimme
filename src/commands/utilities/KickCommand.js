const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'utilities', []);
  }

  run(client, message, args) {
    if (message.member.hasPermission('KICK_MEMBERS'))
      return message.reply(`You don't have permission to use that command. :(`);
    if (args.length === 0)
      return message.reply('You must provide an ID.');
    const member = message.guild.members.cache.get(args[0]);
    if (member) {
      member
        .kick()
        .then((member) => message.channel.send(`${member} was kicked.`))
        .catch((err) => message.channel.send(`I don't have permission to kick that user ${SHRUG}`));
    } else {
      message.channel.send('Memeber not found.');
    }
  }
}