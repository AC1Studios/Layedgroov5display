const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lick',
            group: 'expressions',
            memberName: 'lick',
            aliases: ['licking'],
            description: "lick's at a user of your choice or yourself.",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            clientPermissions: ['ATTACH_FILES'],

            args: [
                {
                    type: 'user',
                    prompt: 'Which user would you like to lick?eww',
                    key: 'user',
                    default: msg => msg.author
                }
            ]
        });
    }

    async run(msg, { user }) {
       
       let owo = await fetch('https://rra.ram.moe/i/r?type=owo') .then(res => res.json())
    .then(json => (`https://rra.ram.moe${json.path}`)
          )
        if (user.id === msg.author.id) {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`**${user.username}** licks... themselves..? wtf`)
                .setImage(owo);
            return msg.channel.send(embed);
          
        } else if (user.id == 752702640021962795){
           const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`Nyaa..♡(｡￫ˇ艸￩) where are you...licking me...`)
                .setImage(owo);
            return msg.channel.send(embed);
        }
else msg.author.id !== user.id;
        const noUserAuthor = msg.author.id !== user.id;

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(
                `_**${msg.author.username}** is licking${
                    noUserAuthor ? ` **${user.username}** :eyes:` : ''
                }._`
            )
            .setImage(owo);
        msg.channel.send(embed2);
    }
};
