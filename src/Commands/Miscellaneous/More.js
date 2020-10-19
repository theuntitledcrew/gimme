const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const subreddits = [
  'boobs',
];

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['britney'],
      description: `It's Britney, bitch.`,
      category: 'Miscellaneous'
    });
  }

  run(message) {
    const title = `Gimme More`
    const url = `https://www.youtube.com/watch?v=elueA2rofoo`
    return message.channel.send(new MessageEmbed().setTitle(title).setURL(url));
  }
};