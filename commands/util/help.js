const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { util: { permissions } } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			aliases: ['commands', 'command-list'],
			group: 'util',
			memberName: 'help',
			description: 'Displays a list of available commands, or detailed information for a specific command.',
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the help for?',
					type: 'command',
					default: ''
				}
			]
		});
	}

	async run(msg, { command }) {
		if (!command) {
			const embeds = [];
			for (let i = 0; i < Math.ceil(this.client.registry.groups.size / 10); i++) {
				const nsfw = msg.channel.nsfw || this.client.isOwner(msg.author);
				const embed = new MessageEmbed()
					.setTitle(`Command List (Page ${i + 1})`)
					.setDescription(stripIndents`
						To run a command, use ${msg.anyUsage('<command>')}.
						${nsfw ? '' : 'Use in an NSFW channel to see NSFW commands.'}
					`)
					.setColor(0x00AE86);
				embeds.push(embed);
			}
			let cmdCount = 0;
			let i = 0;
			let embedIndex = 0;
			for (const group of this.client.registry.groups.values()) {
				i++;
				const owner = this.client.isOwner(msg.author);
				const commands = group.commands.filter(cmd => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});
				if (!commands.size) continue;
				cmdCount += commands.size;
				if (i > (embedIndex * 10) + 10) embedIndex++;
				embeds[embedIndex].addField(`❯ ${group.name}`, commands.map(cmd => `\`${cmd.name}\``).join(' '));
			}
			const allShown = cmdCount === this.client.registry.commands.size;
			embeds[embeds.length - 1]
				.setFooter(`${this.client.registry.commands.size} Commands${allShown ? '' : ` (${cmdCount} Shown)`}`);
			try {
				const msgs = [];
				for (const embed of embeds) msgs.push(await msg.direct({ embed }));
				if (msg.channel.type !== 'dm') msgs.push(await msg.say('📬 Sent you a DM with information.'));
				return msgs;
			} catch {
				return msg.reply('Failed to send DM. You probably have DMs disabled.');
			}
		}
		const userPerms = command.userPermissions
			? command.userPermissions.map(perm => permissions[perm]).join(', ')
			: 'None';
		const clientPerms = command.clientPermissions
			? command.clientPermissions.map(perm => permissions[perm]).join(', ')
			: 'None';
		return msg.say(stripIndents`
			__Command **${command.name}**__${command.guildOnly ? ' (Usable only in servers)' : ''}
			${command.description}${command.details ? `\n${command.details}` : ''}
			**Format:** ${command.usage(command.format || '')}
			**Aliases:** ${command.aliases.join(', ') || 'None'}
			**Group:** ${command.group.name} (\`${command.groupID}:${command.memberName}\`)
			**NSFW:** ${command.nsfw ? 'Yes' : 'No'}
			**Permissions You Need:** ${userPerms}
			**Permissions I Need:** ${clientPerms}
		`);
	}
};
