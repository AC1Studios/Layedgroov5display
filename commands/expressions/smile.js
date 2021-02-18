const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'smile',
            group: 'expressions',
            memberName: 'smile',
            aliases: ['smiling'],
            description: "smile's at a user of your choice or yourself.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to smile to?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
            'https://media1.tenor.com/images/325b3ba6a2beabe21c79b54c6de4e2c7/tenor.gif?itemid=15060821',
          "https://media1.tenor.com/images/c8d13a4636c548e962d8d4fdb0eaa169/tenor.gif?itemid=12217236",
          "https://media1.tenor.com/images/4e0a400d7621b5452854bcae00d9a98e/tenor.gif?itemid=5723668",
          "https://media1.tenor.com/images/c49dc9422aac61eebbf8ae9d42bb26b7/tenor.gif?itemid=15792815",
          "https://media1.tenor.com/images/7676a956e0dda07ec7f55d3eacbf353b/tenor.gif?itemid=16072068",
          "https://media1.tenor.com/images/cc66ae959cb51c118c782325fcdc4f3f/tenor.gif?itemid=9869247",
          "https://media1.tenor.com/images/55dde6c4f1eaca6b1e52626b980c0074/tenor.gif?itemid=13576447",
          "https://media1.tenor.com/images/82b39c323ca376e9bb5844a54973fc42/tenor.gif?itemid=16596386",
          "https://media1.tenor.com/images/cf8a83dbdf57ae8b6bd15353d1c2bb86/tenor.gif?itemid=17477956",
          "https://media1.tenor.com/images/c5fad21f9828d19044a58f8b84a6e14b/tenor.gif?itemid=6013419",
          "https://media1.tenor.com/images/123df3be1acfe3306b91e9c3dd6f9438/tenor.gif?itemid=5322596",
          "https://media1.tenor.com/images/839addada9a7785b2da0aed97f441554/tenor.gif?itemid=9280880",
          "https://media1.tenor.com/images/d5484f103deec4337249bd1654ef4c43/tenor.gif?itemid=17341003"
          
         
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`**${user.username}** is smiling :smile:`)
                .setImage(sub);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** smiles${
                    noUserAuthor ? ` at **${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
