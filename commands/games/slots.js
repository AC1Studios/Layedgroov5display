const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports = class SlotsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slots',
            group: 'games',
            memberName: 'slots',
            description: 'Play a game of slots.'
        });
    }

    run(msg) {
        const slotOne = slots[Math.floor(Math.random() * slots.length)];
        const slotTwo = slots[Math.floor(Math.random() * slots.length)];
        const slotThree = slots[Math.floor(Math.random() * slots.length)];
        if (slotOne === slotTwo && slotOne === slotThree) {
            return msg.say(stripIndents`
				${slotOne}|${slotTwo}|${slotThree}
				Wow! You won! Great job... er... luck!
			`);
        }
        return msg.say(stripIndents`
			${slotOne}|${slotTwo}|${slotThree}
			Aww... You lost... Guess it's just bad luck, huh?
		`);
    }
};
