require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
// const PREFIXES = [process.env.PREFIX1, process.env.PREFIX2];
const PREFIXES = process.env.PREFIXES.split(',');
const TOKEN = process.env.BOT_TOKEN;

const validateMessage = require('../utils/validate');
// const registerCommands = require('./utils/registerCommands');

const client = new Discord.Client();

// Begin commands registry
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
}

// Cooldowns registry
const cooldowns = new Discord.Collection();

// registerCommands(fs, client);


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', (message) => {
	if (message.author.bot) return;
	const prefix = validateMessage(message, PREFIXES)
	console.log(`Prefix: ${prefix}`);
	if (!prefix) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	// console.log(args)
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})


client.login(TOKEN);