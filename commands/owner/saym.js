const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "saym",
      group: "owner",
      memberName: "saym",
      description: "(OWNER ONLY) Sends a message to a channel id",
      details: "(OWNER ONLY) Sends a message to a channel id",
      examples: ["say 469339600196993025 what up"],
      format: "[query]",
      ownerOnly: true,
      hidden: true,

      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: "channelID",
          prompt: "Channel ID to send the message in",
          type: "string"
        },
        {
          key: "channelmsg",
          prompt: "Message to send",
          type: "string"
        }
      ]
    });
  }

  hasPermission(msg) {
    return this.client.isOwner(msg.author);
  }

  async run(msg, { channelID, channelmsg }) {
    const channel = this.client.channels.cache.get(channelID).send(channelmsg);

    return msg.say(`It is sent boss!`);
  }
};
