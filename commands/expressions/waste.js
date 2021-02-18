const { Command } = require('discord.js-commando');
const { get } = require('superagent');
const { MessageAttachment } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'waste',
            group: 'expressions',
            memberName: 'waste',
            description: "kills a user by wasting them",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to waste?',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
        var subreddits = [
           "https://media1.tenor.com/images/ff2dcd44504000e320c21ae5682b5369/tenor.gif?itemid=5749160",
    "http://i.imgur.com/6RuKoez.gif",
    "https://media.giphy.com/media/14igRO8Okm42rK/giphy.gif",
    "https://media1.tenor.com/images/31e22055dfd128b698dec739110c6284/tenor.gif?itemid=5958526",
    "http://i.imgur.com/watpR4J.gif",
    "https://nekoreviewsblog.files.wordpress.com/2016/10/re-zero-gif.gif?w=1000",
    "https://media1.tenor.com/images/44a58e72f3583076111a762b7bb42386/tenor.gif?itemid=5700806",
    "https://media1.tenor.com/images/c45b395f498fe9197a3ad3a5951fc413/tenor.gif?itemid=19396355",
    "https://media1.tenor.com/images/08dbe414a744f9ce506ca7f33505d9fe/tenor.gif?itemid=17641117"
          
        ];

        var sub =
            subreddits[Math.round(Math.random() * (subreddits.length - 1))];
       if (user.id === msg.author.id)
         
            return msg.channel.send(
                `${user.username} is wasting themselves! OOF`
            );
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is wasting${
                    noUserAuthor ? `  **${user.username}**` : ''
                }._`
            )
            .setImage(sub);
        msg.channel.send(embed2);
    }
};
