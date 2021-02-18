const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { delay } = require('../../util/Util');
const directions = ['up', 'down', 'left', 'right'];
const colors = ['red', 'blue', 'green', 'yellow'];
const fruits = ['apple', 'orange', 'pear', 'banana'];

module.exports = class MemoryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'memory',
            group: 'games',
            memberName: 'memory',
            description: 'Test your memory.',
            args: [
                {
                    key: 'level',
                    prompt:
                        'How many directions do you want to have to memorize?',
                    type: 'integer',
                    min: 1,
                    max: 20
                }
            ]
        });
        this.games = new Set();
    }

    async run(msg, { level }) {
        try {
            const memorize = this.genArray(level);
            const memorizeDisplay = memorize
                .map(word => `\`${word.toUpperCase()}\``)
                .join(' ');
            const memorizeMsg = await msg.say(stripIndents`
				**You have 10 seconds to memorize:**
				${memorizeDisplay}
			`);
             await delay(10);
            await memorizeMsg.edit(
                "Type what you saw. Don't worry about formatting, just the words."
            );
            const memorizeType = memorize.join(' ');
            const msgs = await msg.channel.awaitMessages(
                res => msg.author.id === res.author.id,
                {
                    max: 1,
                    time: 30000
                }
            );
            this.games.delete(msg.channel.id);
            if (!msgs.size)
                return msg.say(`Sorry, time is up! It was ${memorizeDisplay}.`);
            const answer = msgs.first().content.toLowerCase();
            if (answer !== memorizeType)
                return msg.say(
                    `Sorry, you typed it wrong. It was ${memorizeDisplay}.`
                );
            return msg.say('Nice job! 10/10! You deserve some cake!');
        } catch (err) {
            this.games.delete(msg.channel.id);
            throw err;
        }
    }

    genArray(level) {
        const sourceArr = [colors, directions, fruits][
            Math.floor(Math.random() * 3)
        ];
        const arr = [];
        for (let i = 0; i < level; i++)
            arr.push(sourceArr[Math.floor(Math.random() * sourceArr.length)]);
        return arr;
    }
};
