const { Command } = require('discord.js-commando');
module.exports = class PruneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'purge',
			aliases: ['clear'],
			group: 'admin',
			memberName: 'purge',
			description: 'Deletes up to 500 messages from the current channel.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'count',
					label: 'amount of messages',
					prompt: 'How many messages do you want to delete? Limit of up to 500.',
					type: 'integer',
					min: 1,
					max: 500
				}
			]
		});
	}

	async run(msg, { count }) {
		count++;
		try {
			const messages = await msg.channel.messages.fetch({ limit: count > 500 ? 500 : count });
			await msg.channel.bulkDelete(messages, true);
			return null;
		} catch {
			return msg.reply('There are no messages younger than two weeks that can be deleted.');
		}
	}
};
