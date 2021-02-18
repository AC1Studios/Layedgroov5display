const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = class PokeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poke',
            group: 'expressions',
            memberName: 'poke',
            aliases: ['boop'],
            description: 'Poke a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to poke?',
                    key: 'user'
                }
            ]
        });
    }

     async run(msg, { user }) {
        if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} wants someone to poke them? omi :o`
            );
        let owo = await fetch('https://nekos.life/api/v2/img/poke').then(res =>
            res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been poked! :eyes:')
            .setDescription(
                `${msg.author.username} poke's ${user.username}. (^^;)`
            )
            .setImage(owo.url)
            .setColor('RANDOM');
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};