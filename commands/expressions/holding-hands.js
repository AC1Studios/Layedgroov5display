const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'holding-hands',
            group: 'expressions',
            memberName: 'holding-hands',
            aliases: ['fuck',"hold-hands"],
            description: "holds hands with user of your choice.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to hold hands to?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
            'https://media1.tenor.com/images/6be077dabeaf2087b3c1d78ce31bd420/tenor.gif?itemid=15080045',
          "https://media1.tenor.com/images/182b5293fa3b7091390faed61e61f1e1/tenor.gif?itemid=17781295",
          "https://media1.tenor.com/images/1e3a49413d4d3816401902123208c516/tenor.gif?itemid=18142637",
        "https://media1.tenor.com/images/0c9e33a5d3d033b11d6c70dfaf0f83f8/tenor.gif?itemid=17310557",
          "https://media1.tenor.com/images/9d17d5eea1c6252726a55be10306f505/tenor.gif?itemid=17827557",
          "https://media1.tenor.com/images/63474a171e085c936a9e5bbe394d257a/tenor.gif?itemid=4991384",
          "https://media1.tenor.com/images/b3c78661c57ce895b827d7424425953d/tenor.gif?itemid=15104649",
          "https://media1.tenor.com/images/5d3fe97db4ccfd1aa939a7240ca77022/tenor.gif?itemid=7371046",
          "https://media1.tenor.com/images/d3c5561f3850d35ec5535dac4de2aa59/tenor.gif?itemid=5372737"
          
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
       if (user.id === msg.author.id)
            return msg.channel.send(
                `${user.username} needs to hold hands with someone :pleading_face: :flushed:.....`
            );
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is holding${
                    noUserAuthor ? `  **${user.username}**'s hand'` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
