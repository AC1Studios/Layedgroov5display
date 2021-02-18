const { Command } = require('discord.js-commando');
const fishes = [':fish:', ':tropical_fish:', ':blowfish:', ':wrench:',":8ball:"];

module.exports = class FishyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fish',
            group: 'response',
            memberName: 'fish',
            description: 'Catches a fish.'
        });
    }

    run(msg) {
        const fish = fishes[Math.floor(Math.random() * fishes.length)];
        return msg.say(`You caught a: ${fish}`);
    }
};
