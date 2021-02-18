const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dm",
      aliases: [],
      group: "owner",
      memberName: "dm",
      description: "DM someone",
      hidden: true,
      ownerOnly: true,
      args: [
        {
          key: "who",
          prompt: "Who do you wanna dm?",
          type: "user"
        },
        {
          key: "msg",
          label: "message",
          prompt: "What do you wanna dm them",
          type: "string"
        }
      ]
    });
  }
  run(message, { who, msg }) {
    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} (The owner of Layedgroov) says......`)
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(msg);
    who
      .send(embed)
      .then(() => message.say("📭 sent successfully!"))
      .catch(() => message.say("⚠️ couldn't send the message..."));
  }
};
