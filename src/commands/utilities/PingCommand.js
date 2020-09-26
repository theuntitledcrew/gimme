const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'utilities', []);
  }

  run(client, message, args) {
    message.channel.send('Pong.');
  }
}