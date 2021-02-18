const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class removeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"unmute",
            group: 'admin',
            memberName: 'unmute',
            description: 'unmutes a user.',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      
            args: [
                {
                    type:"user",
                    prompt:"Which user would you unmute?",
                    key:"user",
                }
                
            ]
        })
    }
    run(msg, { user, }) {
 const mutedRole = msg.guild.roles.cache.find(
      role => role.name === 'Muted'
    );
        msg.guild.member(user).roles.remove(mutedRole)
        msg.say(`${user.username} has been unmuted`)
             user.send(`Your mute has been lifted in ${msg.guild}`);

    
    }
}
