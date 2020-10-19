const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const subreddits = [
  'memes',
  'DeepFriedMemes',
  'bonehurtingjuice',
  'surrealmemes',
  'dankmemes',
];

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['memes'],
      description: 'Memes.',
      category: 'Fun'
    });
  }

  async run(message) {
    const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
      .then(response => response.json())
      .then(body => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];
    return message.channel.send(new MessageEmbed().setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`));
  }

};