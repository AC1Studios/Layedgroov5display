const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const words = require('../../assets/json/word-list');
const { WEBSTER_KEY } = ("dba56339-b399-4e9d-91e9-ce32e62a597c");

module.exports = class HangmanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hangman',
			group: 'games',
			memberName: 'hangman',
			description: 'Prevent a man from being hanged by guessing a word as fast as you can.',
			credit: [
				{
					name: 'Grady Ward',
					url: 'https://en.wikipedia.org/wiki/Grady_Ward',
					reason: 'Moby Word Lists',
					reasonURL: 'http://www.gutenberg.org/ebooks/3201'
				},
				{
					name: 'Merriam-Webster\'s Collegiate® Dictionary',
					url: 'https://www.merriam-webster.com/',
					reason: 'API',
					reasonURL: 'https://dictionaryapi.com/products/api-collegiate-dictionary'
				}
			]
		});
            this.games = new Set();

	}

	async run(msg) {
		
		try {
			const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill('_');
			while (word.length !== confirmation.length && points < 6) {
				await msg.say(stripIndents`
					${displayText === null ? 'Here we go!' : displayText ? 'Good job!' : 'Nope!'}
					\`${display.join(' ')}\`. Which letter do you choose? Type \`end\` to forfeit.
					Incorrect Tries: ${incorrect.join(', ') || 'None'}
					\`\`\`
					___________
					|     |
					|     ${points > 0 ? 'O' : ''}
					|    ${points > 2 ? '—' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '—' : ''}
					|    ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
					===========
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === msg.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!guess.size) {
					await msg.say('Sorry, time is up!');
					break;
				}
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === word) {
					guessed = true;
					break;
				} else if (word.includes(choice)) {
					displayText = true;
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
						confirmation.push(word.charAt(i));
						display[i] = word.charAt(i);
					}
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				}
			}
			this.games.delete(msg.channel.id);
			const defined = await this.defineWord(word);
			if (word.length === confirmation.length || guessed) {
				return msg.say(stripIndents`
					You won, it was ${word}!
					${defined ? `**${defined.name}** (${defined.partOfSpeech})` : ''}
					${defined ? defined.definiton : ''}
				`);
			}
			return msg.say(stripIndents`
				Too bad you just hung a person... It was ${word}...
				${defined ? `**${defined.name}** (${defined.partOfSpeech})` : ''}
				${defined ? defined.definiton : ''}
			`);
		} catch (err) {
			this.games.delete(msg.channel.id);
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	async defineWord(word) {
		try {
			const { body } = await request
				.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
				.query({ key: WEBSTER_KEY });
			if (!body.length) return null;
			const data = body[0];
			if (typeof data === 'string') return null;
			return {
				name: data.meta.stems[0],
				partOfSpeech: data.fl,
				definiton: data.shortdef.map((definition, i) => `(${i + 1}) ${definition}`).join('\n')
			};
		} catch (err) {
			return null;
		}
	}
};