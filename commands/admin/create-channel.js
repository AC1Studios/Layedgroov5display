const { Command } = require('discord.js-commando');
module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'create-channel',
			aliases: ['add-channel'],
			group: 'admin',
			memberName: 'create-channel',
			description: 'Creates a channel.',
			examples: ['create-channel Test channel'],
			guildOnly: true,
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions: ['MANAGE_CHANNELS'],

			args: [
				{
					key: 'name',
					label: 'channel name',
					prompt: 'What would you like the channel to be called?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { name }) {
		const channel = await msg.guild.channels.create(name);
		return msg.reply(`Created ${channel} (${channel.id})`);
	}
};
