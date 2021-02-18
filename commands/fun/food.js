const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const got = require("got");

module.exports = class MemesCommand extends Command {
  constructor(client) {
    super(client, {
      name: "food",
      aliases: ["foodporn"],
      autoAliases: true,
      group: "fun",
      memberName: "food",
      description: "Returns a random food.",
      throttling: {
        usages: 1,
        duration: 10
      }
    });
  }

  async run(msg) {
    const embed = new MessageEmbed();
    got("https://www.reddit.com/r/FoodPorn/random/.json")
      .then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor("RANDOM");
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        msg.channel.send(embed);
      })
      .catch(console.error);
  }
};
