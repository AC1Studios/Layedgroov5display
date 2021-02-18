const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cry',
            group: 'expressions',
            memberName: 'cry',
            aliases: ['crying'],
            description: "cry's at a user of your choice or yourself.",
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
            'https://media1.tenor.com/images/ce52606293142a2bd11cda1d3f0dc12c/tenor.gif?itemid=5184314',
          "https://media1.tenor.com/images/675daa5c96e23bb7e2b5b06ef804cb81/tenor.gif?itemid=15881815",
          "https://media1.tenor.com/images/98466bf4ae57b70548f19863ca7ea2b4/tenor.gif?itemid=14682297",
          "https://media1.tenor.com/images/87ef2f7663b9dc4bf39b7e9481cda842/tenor.gif?itemid=5086387",
          "https://media1.tenor.com/images/09b085a6b0b33a9a9c8529a3d2ee1914/tenor.gif?itemid=5648908",
          "https://media1.tenor.com/images/7ef999b077acd6ebef92afc34690097e/tenor.gif?itemid=10893043",
          "https://media1.tenor.com/images/4b5e9867209d7b1712607958e01a80f1/tenor.gif?itemid=5298257",
          "https://media1.tenor.com/images/2fb2965acbf3ed573e8b63080b947fe5/tenor.gif?itemid=5091716",
          "https://media1.tenor.com/images/e69ebde3631408c200777ebe10f84367/tenor.gif?itemid=5081296",
          "https://media1.tenor.com/images/e0fbb27f7f829805155140f94fe86a2e/tenor.gif?itemid=15134708",
          "https://media1.tenor.com/images/26e7564bfb4408f9f7ff9518d4f87308/tenor.gif?itemid=8199739",
          "https://media1.tenor.com/images/49e4248f18b359dd46f7b60b01d1a4a0/tenor.gif?itemid=5652241",
          "https://media1.tenor.com/images/0436bfc9861b4b57ffffda82d3adad6e/tenor.gif?itemid=15550145",
          "https://media1.tenor.com/images/81d53b1482f85320524c29ca0f7e9259/tenor.gif?itemid=17100832",
          "https://media1.tenor.com/images/4bb996f5c99d48faf8590d8c66396065/tenor.gif?itemid=7552065",
          "https://media1.tenor.com/images/de730b51400ed4dfb66d04141ea79a2d/tenor.gif?itemid=7353410",
          "https://media1.tenor.com/images/dac529ebc72771b9d40373f0c4e10eff/tenor.gif?itemid=3532071"
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`**${user.username}** is crying :sob: :sob: ||what a baby smh||`)
                .setImage(sub);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is crying${
                    noUserAuthor ? ` at **${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
