const { Command } = require('discord.js-commando');

module.exports = class NoUCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'no-u',
			aliases: ['no-you'],
			group: 'fun',
			memberName: 'no-u',
			description: 'no u',
			patterns: [/^n+o+ u+$/i]
		});
	}

	run(msg) {
        if(msg.author.bot) return;
        return msg.say('no u');
    }
};
