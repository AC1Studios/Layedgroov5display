const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dance',
            group: 'expressions',
            memberName: 'dance',
            description: "dances or with a user",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to dance?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
           "https://media1.tenor.com/images/c925511d32350cc04411756d623ebad6/tenor.gif?itemid=13462237",
          "https://media1.tenor.com/images/86ed183f271b9b322aef616ed086c8b6/tenor.gif?itemid=4909808",
          "https://media1.tenor.com/images/8fdcda26512797826631511017a11f93/tenor.gif?itemid=9765182",
          "https://media1.tenor.com/images/1898f99ff4ce6348bb0738c28d2e2894/tenor.gif?itemid=14813413",
          "https://media1.tenor.com/images/8a2e22ee850f5b6ce80223c3dda78273/tenor.gif?itemid=13451376",
          "https://media1.tenor.com/images/81c0b8d3c0617d2902319b7f67e6ce01/tenor.gif?itemid=7560551",
          "https://media1.tenor.com/images/e19a05faf32c511572acd08a38bebdd6/tenor.gif?itemid=13973731",
          "https://media1.tenor.com/images/a1e2967207391a46b54097b2abde78e4/tenor.gif?itemid=16415258",
          "https://media1.tenor.com/images/daa38ff8d98d709e525de49f536ae278/tenor.gif?itemid=11217278",
          "https://media1.tenor.com/images/9ee571803fdbea520d723280a6c2c573/tenor.gif?itemid=15054962",
          "https://media1.tenor.com/images/aa9374ef547c871d4626a22d24042d1f/tenor.gif?itemid=10495378",
          "https://media1.tenor.com/images/04c39f437de3bda67d2dc35bbb563d88/tenor.gif?itemid=12817361",
          "https://media1.tenor.com/images/766599022416cc0b7b7b1bd2040eb2db/tenor.gif?itemid=12039886",
          "https://media1.tenor.com/images/7627a7009dcd44f40bcf3c168f0c6ad6/tenor.gif?itemid=16108170",
          "https://media1.tenor.com/images/f9a825b7d614cedda3fb2676a4ca0b68/tenor.gif?itemid=16127538",
          "https://media1.tenor.com/images/9841990160f71767843af6cf08b5502d/tenor.gif?itemid=9251559",
          "https://media1.tenor.com/images/b9bac6f190cabf3574165538e277c33d/tenor.gif?itemid=12005681",
          "https://media1.tenor.com/images/078d0df8e8fc0d28533b647326bf8f3d/tenor.gif?itemid=13706721"
          
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                    `**${user.username}** is shaking some booty!!!!`
                )
                .setImage(sub);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is dancing with ${
                    noUserAuthor ? `**${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
