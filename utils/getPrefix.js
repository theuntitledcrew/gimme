const getPrefix = (prefix, prefixes) =>
  prefixes.some(p => prefix === `${p} `) ? prefix.trim() : false;

// function getPrefix(message, prefixes) {
//   for (const p of prefixes)
//     if (message.content.startsWith(`${p} `)) return p;
// }

// function getPrefix(message, pfxs) {

//   let prefix = '';
//   for (const thisPrefix of pfxs) {
//     if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
//   }
//   return prefix;
// }

module.exports = getPrefix;