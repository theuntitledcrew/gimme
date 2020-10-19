const Command = require('../../Structures/Command.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['hey'],
      category: 'Miscellaneous',
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    message.channel.send('Hi');
  }

};