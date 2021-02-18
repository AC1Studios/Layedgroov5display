const { Command } = require('discord.js-commando');

module.exports = class BubbleWrapCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bubble-wrap',
			group: 'games',
			memberName: 'bubble-wrap',
			description: 'Pop some bubble wrap.',
			args: [
				{
					key: 'amount',
					prompt: 'How many bubbles should there be?',
					type: 'integer',
					default: 156,
					min: 1,
					max: 250
				}
			]
		});
	}

	run(msg, { amount }) {
		return msg.say(new Array(amount).fill('||POP||').join(' '));
	}
};