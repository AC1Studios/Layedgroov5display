const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class FeedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'feed',
            group: 'expressions',
            memberName: 'feed',
            aliases: ['eat'],
            description: 'feed a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to feed?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
       if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} wants to be fed :yum:`
            );
        let owo = await fetch('https://nekos.life/api/v2/img/feed').then(
            res => res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been fed! ')
            .setDescription(
                `${msg.author.username} fed **${user.username}** *:yum:* `
            )
            .setImage(owo.url)
            .setColor("RANDOM");
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
