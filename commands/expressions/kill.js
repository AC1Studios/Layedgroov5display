const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kill',
            group: 'expressions',
            memberName: 'kill',
            aliases: ['killing'],
            description: 'kills a user of your choice.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to kill?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
            'https://media1.tenor.com/images/2c945adbbc31699861f411f86ce8058f/tenor.gif?itemid=5459053',
          "https://media1.tenor.com/images/9e0b6f8fdecc0eae15a15f91623f94c9/tenor.gif?itemid=14657897",
          "https://media1.tenor.com/images/eb7fc71c616347e556ab2b4c813700d1/tenor.gif?itemid=5840101",
          "https://media1.tenor.com/images/28c19622e8d7362ccc140bb24e4089ec/tenor.gif?itemid=9363668",
          "https://media1.tenor.com/images/bb4b7a7559c709ffa26c5301150e07e4/tenor.gif?itemid=9955653",
          "https://media1.tenor.com/images/a80b2bf31635899ac0900ea6281a41f6/tenor.gif?itemid=5535365",
          "https://media1.tenor.com/images/55507aea306782b916659085fc062909/tenor.gif?itemid=8932977",
          "https://media1.tenor.com/images/c3cbe5b795cd40c0b51d02711f6e3978/tenor.gif?itemid=17223062",
          "https://media1.tenor.com/images/0bc91ca6b474ee250caa9d5243571750/tenor.gif?itemid=19436742",
          "https://media1.tenor.com/images/e4d1625afb87fde8431637f6261f7e05/tenor.gif?itemid=17311346",
          "https://media1.tenor.com/images/62528dd358a06746d692902784050ce1/tenor.gif?itemid=17793586",
          "https://media1.tenor.com/images/e1a8a560a7d532442f6d4e00d6f131a4/tenor.gif?itemid=14424096",
          "https://media.tenor.com/images/d40fe666a5c70e222ad4e19df6fdfff8/tenor.gif",
          "https://media.tenor.com/images/c7dff10ca437305383b50eef0b8b5f58/tenor.gif",
          "https://media.tenor.com/images/0399aa8cc1d6da5ee67bff352e61b16c/tenor.gif",
          "https://media1.tenor.com/images/67564ca0c317c8e8141df663ccf13795/tenor.gif?itemid=17307348",
          "https://media1.tenor.com/images/a48a72fd8a87745fee73453b30f3c5fe/tenor.gif?itemid=17468716",
          "https://media1.tenor.com/images/fff8e3bfc80524fe6cf035acf942012b/tenor.gif?itemid=17468689",
          "https://media1.tenor.com/images/5ef5b545c8377b12fe7edc8f15216d95/tenor.gif?itemid=17468687"
            
        ];
        let owo = await fetch('https://nekos.life/api/v2/img/hug').then(res =>
            res.json()
        );
        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                    `**${user.username}** is trying to kill themselves NOOOOOOOOOOO :sob: *pouts* stay alive please :pleading_face:`
                )
                .setImage(owo.url);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is trying to kill/end ${
                    noUserAuthor ? `**${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
