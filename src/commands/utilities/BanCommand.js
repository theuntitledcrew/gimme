const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'utilities', []);
  }

  run(client, message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply(`You don't have permission to use that command. :(`);
    if (args.length === 0) return message.reply('You must provide an ID.');

    try {
      const user = await message.guild.members.ban(args[0]);
      message.channel.send('User was banned successfully.');
    } catch (err) {
      message.channel.send('An error occured.');
    }
  }
}