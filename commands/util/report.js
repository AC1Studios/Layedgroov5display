const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { list } = require('../../util/Util');
const reasons = ['bug', 'feedback', 'suggestion'];
const reasonColors = ['RED', 'GREEN', 'YELLOW'];
const displayReasons = ['🐛 Bug Report', '📬 Feedback', '❓ Suggestion'];

module.exports = class ReportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'report',
            aliases: [
                'bug',
                'report-bug',
                'feedback',
                'contact',
                'suggest',
                'suggestion'
            ],
            group: 'util',
            memberName: 'report',
            description: 'Reports something to the bot owner(s).',
            guarded: true,
            args: [
                {
                    key: 'reason',
                    prompt: `What is the reason for your report? Either ${list(
                        reasons,
                        'or'
                    )}.`,
                    type: 'string',
                    oneOf: reasons,
                    parse: reason => reasons.indexOf(reason.toLowerCase())
                },
                {
                    key: 'message',
                    prompt: 'What is the message of your report?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { reason, message }) {
        const embed = new MessageEmbed()
            .setDescription(message)
            .setTitle(displayReasons[reason])
            .setAuthor(msg.author.tag)
            .setFooter(`ID: ${msg.author.id} Server:${msg.guild.id} Channel: ${msg.channel.id}`)
            .setTimestamp()
            .setColor(reasonColors[reason]);
        const channel = this.client.channels.cache.get('794244342713024523');
        if (channel) {
            try {
                await channel.send({ embed });
            } catch {
                await this.sendOwnerDM(embed);
            }
        } else {
            await this.sendOwnerDM(embed);
        }
        return msg.say(`${displayReasons[reason]} sent! Thank you!`);
    }

    async sendOwnerDM(embed) {
        for (const owner of this.client.owners) {
            try {
                await owner.send({ embed });
            } catch {
                continue;
            }
        }
        return null;
    }
};
