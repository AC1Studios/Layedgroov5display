const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const config = require('../../data/config.json');
module.exports = class WeatherCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			aliases: ['open-weather-map', 'owm'],
			group: 'info',
			memberName: 'weather',
			description: 'Responds with weather information for a specific location.',
			clientPermissions: ['EMBED_LINKS'],
			credit: [
				{
					name: 'OpenWeatherMap',
					url: 'https://openweathermap.org/',
					reason: 'API',
					reasonURL: 'https://openweathermap.org/api'
				}
			],
			args: [
				{
					key: 'location',
					prompt: 'What location would you like to get the weather of?(Zip code will only work)',
					type: 'string',
					parse: location => {
						if (/^[0-9]+$/.test(location)) return { type: 'zip', data: location };
						return { type: 'q', data: location };
					}
				}
			]
		});
	}

	async run(msg, { location }) {
		try {
			const { body } = await request
				.get('https://api.openweathermap.org/data/2.5/weather')
				.query({
					q: location.type === 'q' ? location.data : '',
					zip: location.type === 'zip' ? location.data : '',
					units: 'imperial',
					appid: config.WEATHER
				});
			const embed = new MessageEmbed()
				.setColor(0xFF7A09)
				.setAuthor(
					`${body.name}, ${body.sys.country}`,
					'https://i.imgur.com/NjMbE9o.png',
					'https://openweathermap.org/city'
				)
				.setURL(`https://openweathermap.org/city/${body.id}`)
				.setTimestamp()
				.addField('❯ Condition', body.weather.map(data => `${data.main} (${data.description})`).join('\n'))
				.addField('❯ Temperature', `${body.main.temp}°F`, true)
				.addField('❯ Humidity', `${body.main.humidity}%`, true)
				.addField('❯ Wind Speed', `${body.wind.speed} mph`, true);
			return msg.embed(embed);
		} catch (err) {
			if (err.status === 404) return msg.say('Could not find any results.');
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
