const getPrefix = require('./getPrefix');

function validateMessage(message, prefixes) {
  if (message.author.bot) return false;
  const pre = `${message.content.split(/\s+/)[0]} `;
  const prefix = getPrefix(pre, prefixes);
  return prefix;
}
module.exports = validateMessage;