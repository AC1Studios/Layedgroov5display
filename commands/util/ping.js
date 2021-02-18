const { Command } = require("discord.js-commando");
const { stripIndents } = require("common-tags");
const { formatNumber } = require("../../util/Util");
const { MessageEmbed } = require("discord.js");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["pong", "ping-pong"],
      group: "util",
      memberName: "ping",
      description: "Checks the bot's ping to the Discord server.",
      guarded: true,
      throttling: {
        usages: 1,
        duration: 2
      }
    });
  }

  async run(msg) {
    const message = await msg.say("Pinging...");
   const ping = Math.round(message.createdTimestamp - msg.createdTimestamp);
    message.edit(`🏓 P${"o".repeat(Math.min(Math.round(ping / 100), 1500))}ng!`)
  
    const embed = new MessageEmbed()
    .setColor("RED")
            .addField('Roundtrip', `\`${formatNumber(ping)}ms\``)
.addField('Database',`\`${formatNumber(Math.round(this.client.ws.ping))}ms\``)
    .setFooter(`Discord API issues could lead to high roundtrip times`)
    return message.edit(embed);
  }
};
