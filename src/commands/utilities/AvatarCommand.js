const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'utilities', ['icon']);
  }

  run(client, message, args) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
    });

    message.channel.send(avatarList);
  }
}