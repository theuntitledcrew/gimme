const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServerCommand extends BaseCommand {
  constructor() {
    super('server', 'utilities', []);
  }

  run(client, message, args) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
}