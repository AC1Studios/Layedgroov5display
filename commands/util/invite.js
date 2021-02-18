const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../data/config.json');
const heart = `<:Pink_heart:802963426627289141>`;
const blush = `<:shy_plead:806744773909151745>`;

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'util',
            memberName: 'invite',
            description: "Responds with the bot's invite link.",
            guarded: true,
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(msg) {
       var phrases = [
            `Add me to your server with these links! ${heart}`,
            `I-It\'s not like I want to be invited to your server... .-.`,
            `Invite me Friend :3!`,
            `Hello... Please take me... ${blush}`,
            `I\'d love to be in your server! ${heart}`,
            `Ehehe you want me in your server ${blush}`,
            `A server? Of course! ${heart}`,
            `P-Please invite me.. to your server... ${blush}`
        ]
               var phrase = phrases[Math.round(Math.random() * (phrases.length - 1))];

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(phrase)
            .addField('❯ invite bot link:', `${config.il}`)
            .addField('❯ Top.gg:', `https://top.gg/bot/752702640021962795`)

            .addField('❯ Home Server', `(https://discord.gg/xGUbna4DX4)`);

        return msg.embed(embed);
    }
};
