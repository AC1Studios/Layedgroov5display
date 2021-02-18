const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class tickleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tickle',
            group: 'expressions',
            memberName: 'tickle',
            aliases: ['tick'],
            description: 'tickles a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to tickle haha?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
        let owo = await fetch('https://nekos.life/api/v2/img/tickle').then(
            res => res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been tickled HAHA! ')
            .setDescription(
                `${msg.author.username} tickled **${user}** *:joy::joy:* `
            )
            .setImage(owo.url)
            .setColor("RANDOM");
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
