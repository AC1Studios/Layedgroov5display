const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            group: 'expressions',
            memberName: 'kiss',
            aliases: ['kissing'],
            description: 'kisses a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to kiss?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
        if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} wants a kiss :flushed:...... uhhhh ;-; you kiss yourself 0-0`
            );
        let owo = await fetch('https://nekos.life/api/v2/img/kiss').then(res =>
            res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been kissed! ')
            .setDescription(
                `${msg.author.username} is kissing **${user.username}** *:kiss: :kissing_heart:* `
            )
            .setImage(owo.url)
            .setColor('RANDOM');
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
