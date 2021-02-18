const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            group: 'expressions',
            memberName: 'slap',
            aliases: [],
            description: 'Slap a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to slap?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
      
        let owo = await fetch('https://nekos.life/api/v2/img/slap').then(res =>
            res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been slapped! :o')
            .setDescription(
                `${msg.author.username} slaps ${user.username}! **BAM!**`
            )
            .setImage(owo.url)
            .setColor('RANDOM');
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
