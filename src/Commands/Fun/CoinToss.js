const Command = require('../../Structures/Command.js');
module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['coin', 'toss', 'cointoss', 'coin toss'],
      category: 'Fun',
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    var answers = ['You flipped the coin, it lands on tails.', 'I flipped the coin, it lands on tails.', 'You flipped the coin, it lands on heads.', 'I flipped the coin, it lands on heads.'];
    let finalAnswer = answers[Math.floor(Math.random() * answers.length)];
    message.channel.send(finalAnswer);
  }

};