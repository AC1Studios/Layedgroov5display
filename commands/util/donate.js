const {Command} = require('discord.js-commando');
const {stripIndents} = require('common-tags');

module.exports = class DonateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'donate',
            memberName: 'donate',
            group: 'util',
            description: 'Responds with the bot\'s and Author\'s donation links.',
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(msg) {
        return msg.say(stripIndents`
            Contribute to the hosting of the bot and maybe upgrade of it~!
           go to my support server and boost my server would be much appreciate as a donate
            
        `);
    }
};