const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber } = require('../../util/Util');
const { version, dependencies } = require('../../package');

module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            group: 'util',
            memberName: 'vote',
            description: 'Responds with detailed bot information.',
            guarded: true,
            clientPermissions: ['EMBED_LINKS'],
            throttling: {
                usages: 1,
                duration: 2
            }
        });
    }

    run(msg) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setFooter('layedbak#2745')
            .addField(
                '❯ Vote on top.gg',
                `[Here](https://top.gg/bot/752702640021962795)`,
                true
            );

        return msg.embed(embed);
    }
};
