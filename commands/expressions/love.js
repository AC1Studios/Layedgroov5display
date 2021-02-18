const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'love',
            group: 'expressions',
            memberName: 'love',
            description: "in love to someone",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user do you love?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
           "https://media1.tenor.com/images/f68c955294bbf31734786b08e538d7e7/tenor.gif?itemid=7366180",
          "https://media1.tenor.com/images/ef02d189f05a0ca531ecc6afcb5e8204/tenor.gif?itemid=4371328",
          "https://media1.tenor.com/images/be8c571dabed34840c4a0f3da4f7f88f/tenor.gif?itemid=4394528",
          "https://media1.tenor.com/images/dc9b433cdd102f690521646c7562cdf9/tenor.gif?itemid=12434287",
          "https://media1.tenor.com/images/dd10eb337856d14a8640828f99dd7a2f/tenor.gif?itemid=12479111",
          "https://media1.tenor.com/images/1477bab6bf5765be4c5c945dceab1112/tenor.gif?itemid=16026824",
          "https://media1.tenor.com/images/5e879fda9339acef12964a486c07685d/tenor.gif?itemid=15792741",
          "https://media1.tenor.com/images/e2baefc193b09432ab2ad92879e95247/tenor.gif?itemid=16052966",
          "https://media1.tenor.com/images/b67fc226c4d2403423a3dc6cb95eb128/tenor.gif?itemid=16038266",
          "https://media1.tenor.com/images/0b7a2db6f377f33c2b574599003f0148/tenor.gif?itemid=5467524",
          "https://media1.tenor.com/images/110dbddfd3d662479c214cacb754995d/tenor.gif?itemid=10932413",
          "https://media1.tenor.com/images/a541849cc0bd5cd9d8641a0fb8c30fad/tenor.gif?itemid=14694702",
          "https://media1.tenor.com/images/f0479ee873f30213a7a5579cc18da5d0/tenor.gif?itemid=12165912",
          "https://media1.tenor.com/images/0aa14ba248cb9a2998ef8f7a9bb34abc/tenor.gif?itemid=9441517",
          "https://media1.tenor.com/images/23ee64fe848079c462983f9f0958e5ca/tenor.gif?itemid=15792779"
          
          
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(
                    `:heart: **${user.username}** is in love!!! :heartbeat:`
                )
                .setImage(sub);
            return msg.channel.send(embed);
        } else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is in love with ${
                    noUserAuthor ? `**${user.username}** :blush:` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
