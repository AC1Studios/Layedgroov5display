const { FriendlyError, SQLiteProvider } = require("discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const moment = require("moment");
const path = require("path");
const sqlite = require("sqlite");
const config = require("./data/config.json");
const winston = require("winston");
const { Structures } = require("discord.js");
const Client = require("./lib/PonyCommandoClient");
const PonyUtils = require("./lib/PonyUtils");
const Canvas = require('canvas');
const db = require('quick.db');

const cmds = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "commands.log" })
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    winston.format.printf(
      log => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`
    )
  )
});
Structures.extend("Guild", Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        loopQueue: false,
        volume: 1
      };
    }
  }
  return MusicGuild;
});
const client = new Client({
  commandPrefix: config.PREFIX,
  owner: config.OWNER,
  disableEveryone: true,
  unknownCommandResponse: false,
  disabledEvents: ["TYPING_START"]
});

sqlite.open(path.join(__dirname, "/data/settings.sqlite3")).then(db => {
  client.setProvider(new SQLiteProvider(db));
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["fun", "Fun"],
    ["games", "Games"],
    ["music", "Music"],
    ["avatar-edit", "Avatar edit"],
    ["image-edit", "image-edit"],
    ["edit-text", "Edit Text"],
    ["expressions", "roleplay"],
    ["info", "Information"],
    ["owner", "Owner Only Commands"],
    ["response", "responsive"],
    ["util", "Utility"],
    ["admin", "Moderation"],
    ["nsfw", "NSFW"]
  ])
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => require("./events/ready")(client));
client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});
client.on("guildCreate", async guild => {
  const blush = `<:blush:806744951869276180>`;
  if (!guild.available) return;
 const embed = new MessageEmbed({
    author: {
      name: "Hello, I'm Layedgroov!",
      iconURL: client.user.displayAvatarURL()
    },
    description: `You've just added me to **${
      guild.name
    }**.\n\nHere is some information about myself:\n\n${await PonyUtils.getHelpText(
      guild
    )}`,

    timestamp: moment().format("LLL"),
    footer: {
      text: client.user.tag
    }
  });

if (guild.systemChannel && guild.systemChannel.permissionsFor(client.user).has('SEND_MESSAGES')) {
		try {
			const usage = client.registry.commands.get('help').usage();
			await guild.systemChannel.send(embed);
		} catch {
			// Nothing!
		}
	}
})

client.on("message", async message => {
  if (message.author.id === client.user.id) {
    return;
  }

  if (message.channel.type === "group") {
    return;
  }

  if (message.author.bot) {
    return;
  }

  if (!message.guild) {
    return;
  }
});

client.on("commandError", (cmd, err) => {
  if (err instanceof FriendlyError) return;
  client.logger.error(
    `Error in command ${cmd.groupID}: ${cmd.memberName} ${err}`
  );
});
client.on("commandRun", async (cmd, promise, msg) => {
  if (msg.channel.type === "dm") {
    cmds.info(
      `${msg.author.tag} (${
        msg.author.id
      }) ran the command ${cmd.name.toUpperCase()} in DM`
    );
  } else {
    cmds.info(
      `${msg.author.tag} (${
        msg.author.id
      }) ran the command ${cmd.name.toUpperCase()} in ${msg.guild.name} (${
        msg.guild.id
      })`
    );
  }
});

client.on("commandBlocked", (msg, reason) => {
  client.logger.warn(
    `Command [${msg.command.groupID}:${msg.command.memberName}] blocked. Reason: ${reason}`
  );
});
client.on('guildMemberAdd', async member => {
  //Grab DB 1 get
  const serverSettingsFetch = db.get(member.guild.id);
  if (!serverSettingsFetch || serverSettingsFetch == null) return;

  const welcomeMsgSettings = serverSettingsFetch.serverSettings.welcomeMsg;
  if (welcomeMsgSettings == undefined) return;

  if (welcomeMsgSettings.status == 'no') return;

  if (welcomeMsgSettings.status == 'yes') {
    var applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      let fontSize = 70;

      do {
        ctx.font = `${(fontSize -= 10)}px Open Sans Light`; // This needs to match the family Name on line 65
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };
    
    // Customizable Welcome Image Options
    var canvas = await Canvas.createCanvas(
      welcomeMsgSettings.imageWidth,
      welcomeMsgSettings.imageHeight
    );
    var ctx = canvas.getContext('2d');

    // Background Image Options
    var background = await Canvas.loadImage(welcomeMsgSettings.wallpaperURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Background Image Border Options
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Upper Text Options Default
    if (welcomeMsgSettings.topImageText == 'default') {
      ctx.font = '26px Open Sans Light'; // This needs to match the family Name on line 65
      ctx.fillStyle = '#FFFFFF'; // Main Color of the Text on the top of the welcome image
      ctx.fillText(
        `Welcome to ${member.guild.name}`, //<-- didn't play nice being stored in DB -Default
        canvas.width / 2.5,
        canvas.height / 3.5
      );
      ctx.strokeStyle = `#FFFFFF`; // Secondary Color of Text on the top of welcome for depth/shadow the stroke is under the main color
      ctx.strokeText(
        `Welcome to ${member.guild.name}`, //<-- didn't play nice being stored in DB -Default
        canvas.width / 2.5,
        canvas.height / 3.5
      );
    } else {
      
      // Upper Text Options DB
      ctx.font = '26px Open Sans Light'; // if the font register changed this needs to match the family Name on line 65
      ctx.fillStyle = '#FFFFFF'; // Main Color of the Text on the top of the welcome image
      ctx.fillText(
        welcomeMsgSettings.topImageText,
        canvas.width / 2.5,
        canvas.height / 3.5
      );
      ctx.strokeStyle = `#FFFFFF`; // Secondary Color of Text on the top of welcome for depth/shadow the stroke is under the main color
      ctx.strokeText(
        welcomeMsgSettings.topImageText,
        canvas.width / 2.5,
        canvas.height / 3.5
      );
    }
   
    // Lower Text Options Defaults
    if (welcomeMsgSettings.bottomImageText == 'default') {
      ctx.font = applyText(canvas, `${member.displayName}!`);
      ctx.fillStyle = '#FFFFFF'; // Main Color for the members name for the welcome image
      ctx.fillText(
        `${member.displayName}!`, //<-- didn't play nice being stored in DB -Default
        canvas.width / 2.5,
        canvas.height / 1.8
      );
      ctx.strokeStyle = `#FF0000`; // Secondary Color for the member name to add depth/shadow to the text
      ctx.strokeText(
        `${member.displayName}!`, //<-- didn't play nice being stored in DB -Default
        canvas.width / 2.5,
        canvas.height / 1.8
      );
    } else {
      //Lower Text Options DB
      ctx.font = applyText(canvas, `${member.displayName}!`);
      ctx.fillStyle = '#FFFFFF'; // Main Color for the members name for the welcome image
      ctx.fillText(
        welcomeMsgSettings.bottomImageText,
        canvas.width / 2.5,
        canvas.height / 1.8
      );
      ctx.strokeStyle = `#FF0000`; // Secondary Color for the member name to add depth/shadow to the text
      ctx.strokeText(
        welcomeMsgSettings.bottomImageText,
        canvas.width / 2.5,
        canvas.height / 1.8
      );
    }
    
    // Avatar Shape Options
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true); // Shape option (circle)
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'jpg'
      })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);
    // Image is Built and Ready
    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      'welcome-image.png'
    );
    
    // Welcome Embed Report
    var embed = new MessageEmbed()
      .setColor(`RANDOM`)
      .attachFiles(attachment)
      .setImage('attachment://welcome-image.png')
      .setFooter(`Type help for a feature list!`)
      .setTimestamp();
    if (welcomeMsgSettings.embedTitle == 'default') {
      embed.setTitle(
        `:speech_balloon: Hey ${member.displayName}, You look new to ${member.guild.name}!` //<-- didn't play nice being stored in DB -Default
      );
    } else embed.setTitle(welcomeMsgSettings.embedTitle);
    
    // Sends a DM if set to or if destenation is not present in DB(pre channel option users)
    if (
      welcomeMsgSettings.destination == 'direct message' ||
      !welcomeMsgSettings.destination
    )
      try {
        await member.user.send(embed);
      } catch {
        console.log(`${member.user.username}'s dms are private`);
      }
    
    // Sends to assigned Channel from DB
    if (welcomeMsgSettings.destination != 'direct message') {
      const channel = member.guild.channels.cache.find(
        channel => channel.name === welcomeMsgSettings.destination
      );
      await channel.send(`${member}`);
      await channel.send(embed);
    }
  }
});

client.login(config.TOKEN).catch(err => {
  client.logger.error(err);
});
