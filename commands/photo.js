const fetch = require('node-fetch');

module.exports = {
    name: 'photo',
    description: 'Gives a photo.',
    async execute(message, args) {
        await fetch(`https://api.reddit.com/r/${args[0]}/top.json?sort=hot&t=day&limit=1`).then(response => response.json())
        .then(response => {
            message.channel.send(response.data.children[0].data.url);
        });
    }
}

// module.exports = {
//     name: 'photo',
//     description: 'Gives a photo.',
//     async execute(message, args) {
//         if (args[0] === 'cat') {
//             const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
//             message.channel.send(file);
//         }
//     }
// }