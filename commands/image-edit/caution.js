const { Command } = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { wrapText } = require('../../util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Bold.ttf'), { family: 'Noto', weight: 'bold' });

module.exports = class CautionCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'caution',
			aliases: ['caution-sign'],
			group: 'image-edit',
			memberName: 'caution',
			description: 'Creates a caution sign with the text of your choice.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			credit: [
				{
					name: 'Google',
					url: 'https://www.google.com/',
					reason: 'Noto Font',
					reasonURL: 'https://www.google.com/get/noto/'
				},
				{
					name: 'Wikimedia Commons',
					url: 'https://commons.wikimedia.org/wiki/Main_Page',
					reason: 'Image',
					reasonURL: 'https://commons.wikimedia.org/wiki/File:Caution_blank.svg'
				}
			],
			args: [
				{
					key: 'text',
					prompt: 'What text should the caution sign say?',
					type: 'string',
					max: 500
				}
			]
		});
	}

	async run(msg, { text }) {
		const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'caution.png'));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.font = 'normal bold 60px Noto';
		let fontSize = 60;
		while (ctx.measureText(text).width > 3311) {
			fontSize--;
			ctx.font = `normal bold ${fontSize}px Noto`;
		}
		const lines = await wrapText(ctx, text.toUpperCase(), 895);
		const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
		for (let i = 0; i < lines.length; i++) {
			const height = topMost + ((fontSize + 20) * i);
			ctx.fillText(lines[i], base.width / 2, height);
		}
		return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'caution.png' }] });
	}
};
