const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['ud', 'define'],
      description: 'Get the definition of a word, or phrase, from Urban Dictionary.',
      category: 'Fun'
    });
  }

  async run(message, args) {
    if (!args.length) {
      return message.channel.send('You need to supply a search term!');
    }

    const query = querystring.stringify({ term: args.join(' ') });

    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

    if (!list.length) {
      return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const [answer] = list;

    const embed = new MessageEmbed()
      .setColor('#EFFF00')
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addFields(
        { name: 'Definition', value: trim(answer.definition, 1024) },
        { name: 'Example', value: trim(answer.example, 1024) },
        { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
      );
    message.channel.send(embed);
  }

};