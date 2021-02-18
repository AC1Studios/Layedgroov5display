const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'expressions',
            memberName: 'hug',
            aliases: ['hugging'],
            description: 'Hug a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to hug?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
        if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} needs a hug :pleading_face:.....`
            );

        let owo = await fetch('https://nekos.life/api/v2/img/hug').then(res =>
            res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been hugged! ')
            .setDescription(
                `${msg.author.username} is hugging **${user.username}** *ʕっ•ᴥ•ʔっ :hugging:* `
            )
            .setImage(owo.url)
            .setColor('RANDOM');
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
