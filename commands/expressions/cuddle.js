const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cuddle',
            group: 'expressions',
            memberName: 'cuddle',
            aliases: ['cuddling', 'hold'],
            description: 'cuddle a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to cuddle?',
                    key: 'user'
                }
            ]
        });
    }

    async run(msg, { user }) {
       if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} needs a cuddle :pleading_face:.....`
            );
        let owo = await fetch('https://nekos.life/api/v2/img/cuddle').then(
            res => res.json()
        );

        const hugembed = new MessageEmbed()
            .setTitle(user.username + ' You have been cuddled! :blush: ')
            .setDescription(
                `${msg.author.username} is cuddling **${user.username}** *ʕっ•ᴥ•ʔっ* `
            )
            .setImage(owo.url)
            .setColor("RANDOM");
        msg.channel.send(hugembed).catch(error => {
            console.error(error);
        });
    }
};
