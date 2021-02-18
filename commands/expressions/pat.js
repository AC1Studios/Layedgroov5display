const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            group: 'expressions',
            memberName: 'pat',
            aliases: ['patting'],
            description: 'Pat a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to pat?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
       if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} needs someone to pat them :pleading_face:.....`
            );
        let owo = await fetch('https://nekos.life/api/v2/img/pat').then(res =>
            res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been patted! ')
            .setDescription(
                `${msg.author.username} pats ${user.username}. (^^;)`
            )
            .setImage(owo.url)
            .setColor('RANDOM');
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
