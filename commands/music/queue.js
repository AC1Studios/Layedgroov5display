const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['song-list', 'next-songs'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Display the song queue'
    });
  }

  run(message) {
    if (message.guild.musicData.queue.length == 0)
      return message.say('There are no songs in queue!');
    /* eslint-disable */
    // display only first 10 items in queue
    /* eslint-enable */
     const titleArray = [];
    /* eslint-disable */
    // display only first 10 items in queue
    message.guild.musicData.queue.slice(0, 10).forEach(obj => {
    
        const queueClone = message.guild.musicData.queue;

    const queueEmbed = new Pagination.FieldsEmbed()
      .setArray(queueClone)
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setElementsPerPage(8)
        return `**${queueClone.indexOf(obj) + 1}**: [${obj.title}](${obj.url})`;
    
});
    queueEmbed.embed.setColor('#ff7373').setTitle('Music Queue');
    queueEmbed.build();
  }
};