const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const subreddits = [
  'Bulges',
];

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['bulge', 'bulges'],
      description: 'Bulges.',
      category: 'NSFW'
    });
  }

  async run(message) {
    const data = await fetch(`http://www.reddit.com/r/Bulges/top/.json?sort=top&t=all&limit=50`)
      .then(response => response.json())
      .then(body => body.data);
    let isImage = false
    let randomSelection = Math.floor(Math.random() * data.children.length)
    while (!isImage) {
      if (data.children[randomSelection].data.post_hint === "image") {
        isImage = true
      } else {
        randomSelection = Math.floor(Math.random() * data.children.length)
      }
    }
    const imageURL = data.children[randomSelection].data.url
    console.log(data);
    return message.channel.send(new MessageEmbed().setImage(`${imageURL}`));
  }
};