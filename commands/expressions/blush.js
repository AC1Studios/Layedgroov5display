const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blush',
            group: 'expressions',
            memberName: 'blush',
            aliases: ['blushing'],
            description: 'blush a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to cuddle?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
            'https://media1.tenor.com/images/794f8ff2b76326abe77171b3fb21252d/tenor.gif?itemid=11825225',
            'https://media1.tenor.com/images/981ee5030a18a779e899b2c307e65f7a/tenor.gif?itemid=13159552',
            'https://media.tenor.com/images/502d721f4db727dbe222a6e57c3c4c2a/tenor.gif',
            'https://media1.tenor.com/images/cbfd2a06c6d350e19a0c173dec8dccde/tenor.gif?itemid=15727535',
            'https://media.tenor.com/images/4b0f5742525e44fad07d39590f61fcff/tenor.gif',
            'https://media.tenor.com/images/75936b8b93269bd293bd184eb209e358/tenor.gif',
            'https://media.tenor.com/images/6ea76d106fd50e5ad420dba6bfc4504e/tenor.gif',
            'https://media1.tenor.com/images/f72035e032125a5395883b8d68d9df5d/tenor.gif?itemid=16149781',
            'https://media.tenor.com/images/5f737df63beee63857ce767a877547ff/tenor.gif',
            'https://media.tenor.com/images/62eaf1d2b70f364b77e6dbaf1421c0cc/tenor.gif',
            'https://media1.tenor.com/images/8f76f034ccc458bd09675c0380f59cb7/tenor.gif?itemid=5634589',
            'https://media1.tenor.com/images/1796f5f2469c4777cadf2a1ab57c6c0d/tenor.gif?itemid=9768769',
            'https://media.tenor.com/images/d8432cf1b8c90e2b791c4cc206062596/tenor.gif',
            'https://media1.tenor.com/images/ea8977dd6dc918c2d0fc253d714105f4/tenor.gif?itemid=10750489',
            'https://media.tenor.com/images/a948c84155a2d2e7bc860b2b9fb38e07/tenor.gif',
            'https://media.tenor.com/images/52be0797a283d21927c3d4acff1b7bd3/tenor.gif',
            'https://media.tenor.com/images/7476fb3f369d35a3a4f63552c97863c0/tenor.gif'
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`**${user.username}** is blushing :o :blush:`)
                .setImage(sub);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** blushes${
                    noUserAuthor ? ` at **${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
