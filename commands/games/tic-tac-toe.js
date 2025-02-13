const { Command } = require('discord.js-commando');
const tictactoe = require('tictactoe-minimax-ai');
const { stripIndents } = require('common-tags');
const { verify } = require('../../util/Util');
const nums = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

module.exports = class TicTacToeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tic-tac-toe',
			aliases: ['ttt', 'tic-tac'],
			group: 'games',
			memberName: 'tic-tac-toe',
			description: 'Play a game of tic-tac-toe with another user or the AI.',
			args: [
				{
					key: 'opponent',
					prompt: 'What user would you like to challenge? To play against AI, choose me or any other bot.',
					type: 'user',
				}
			]
		});
                this.games = new Set();

	}

	async run(msg, { opponent }) {
		if (opponent.id === msg.author.id) return msg.reply('You may not play against yourself.');
		
		try {
			if (!opponent.bot) {
				await msg.say(`${opponent}, do you accept this challenge?`);
				const verification = await verify(msg.channel, opponent);
				if (!verification) {
					this.games.delete(msg.channel.id);
					return msg.say('Looks like they declined...');
				}
			}
			const sides = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			let lastTurnTimeout = false;
			while (!winner && taken.length < 9) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? 'X' : 'O';
				let choice;
				if (opponent.bot && !userTurn) {
					choice = tictactoe.bestMove(this.convertBoard(sides), { computer: 'o', opponent: 'x' });
				} else {
					await msg.say(stripIndents`
						${user}, which side do you pick? Type \`end\` to forefeit.
						${this.displayBoard(sides)}
					`);
					const filter = res => {
						if (res.author.id !== user.id) return false;
						const pick = res.content;
						if (pick.toLowerCase() === 'end') return true;
						return sides.includes(pick) && !taken.includes(pick);
					};
					const turn = await msg.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await msg.say('Sorry, time is up!');
						if (lastTurnTimeout) {
							winner = 'time';
							break;
						} else {
							userTurn = !userTurn;
							lastTurnTimeout = true;
							continue;
						}
					}
					choice = turn.first().content;
					if (choice.toLowerCase() === 'end') {
						winner = userTurn ? opponent : msg.author;
						break;
					}
				}
				sides[opponent.bot && !userTurn ? choice : Number.parseInt(choice, 10) - 1] = sign;
				taken.push(choice);
				const win = this.verifyWin(sides, msg.author, opponent);
				if (win) winner = win;
				if (lastTurnTimeout) lastTurnTimeout = false;
				userTurn = !userTurn;
			}
			this.games.delete(msg.channel.id);
			if (winner === 'time') return msg.say('Game ended due to inactivity.');
			return msg.say(stripIndents`
				${winner === 'tie' ? 'Oh... The cat won.' : `Congrats, ${winner}!`}
				${this.displayBoard(sides)}
			`);
		} catch (err) {
			this.games.delete(msg.channel.id);
			throw err;
		}
	}

	verifyWin(sides, player1, player2) {
		const evaluated = tictactoe.boardEvaluate(this.convertBoard(sides)).status;
		if (evaluated === 'win') return player1;
		if (evaluated === 'loss') return player2;
		if (evaluated === 'tie') return 'tie';
		return false;
	}

	convertBoard(board) {
		const newBoard = [[], [], []];
		let col = 0;
		for (const piece of board) {
			if (piece === 'X') {
				newBoard[col].push('x');
			} else if (piece === 'O') {
				newBoard[col].push('o');
			} else {
				newBoard[col].push('_');
			}
			if (newBoard[col].length === 3) col++;
		}
		return newBoard;
	}

	displayBoard(board) {
		let str = '';
		for (let i = 0; i < board.length; i++) {
			if (board[i] === 'X') {
				str += '❌';
			} else if (board[i] === 'O') {
				str += '⭕';
			} else {
				str += nums[i];
			}
			if (i % 3 === 2) str += '\n';
		}
		return str;
	}
};
