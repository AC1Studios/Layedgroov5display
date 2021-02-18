const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['mute-user'],
            memberName: 'mute',
            group: 'admin',
            description:
                'Mutes a tagged user (if you have already created a Muted role)',
            guildOnly: true,
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    key: 'userToMute',
                    prompt:
                        'Please mention the user you want to mute with @ or provide their ID.',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to mute this user?',
                    type: 'string',
                },
                {
                    key: 'time',
                    label: 'time',
                    prompt: 'How long will the user be muted for in minutes?(Type 0 for "forever")',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, { userToMute, reason, time }) {
        const mutedRole = message.guild.roles.cache.find(
            role => role.name === 'Muted'
        );
        if (mutedRole == null)
            return message.channel.send(
                'No "Muted" role found, create one and try again.'
            );

        const extractNumber = /\d+/g;

        if (userToMute.match(extractNumber) == undefined)
            return message.channel.send('Please try again with a valid user.');

        const userToMuteID = userToMute.match(extractNumber)[0];
        const user =
            message.mentions.members.first() ||
            (await message.guild.members.fetch(userToMuteID));
        if (user == undefined)
            return message.channel.send('Please try again with a valid user.');
        user.roles
            .add(mutedRole)
            .then(() => {
                const muteEmbed = new MessageEmbed()
                    .addField('Muted:', userToMute)
                    .addField('Reason', reason)
                    .addField('Moderator', `<@${message.author.id}>`)
                    .addField('Duration', ms(ms(time), { long: true }))

                    .setTimestamp()
                    .setColor('#5dc4ff');
                message.channel.send(muteEmbed);
                user.send(`You have been muted in ${message.guild}`);
            })
            .catch(err => {
                message.say(
                    'Something went wrong when trying to mute this user.'
                );
                return console.error(err);
            });
        if (time === 0) return;
       if(!time) setTimeout(() => {
            message.guild.member(user).roles.remove(mutedRole);
            message.say(`${userToMute}'s mute has been lifted.`);
            user.send(`Your mute has been lifted.`);
        }, ms(time));
    }
};
