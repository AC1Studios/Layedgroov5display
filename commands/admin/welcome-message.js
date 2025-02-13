const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class WecomeMessageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'welcome-message',
      memberName: 'welcome-message',
      aliases: ['welcomemessage', 'welcome'],
      group: 'admin',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      examples: ['!welcome yes', '!welcome no'],
      description:
        'Allows you to toggle the welcome message for new members that join the server.',
      args: [
        {
          key: 'choice',
          prompt: 'Do you want me to welcome new members? Type Yes or No',
          type: 'string',
          oneOf: ['yes', 'no', 'enable', 'disable']
        }
      ]
    });
  }

  //DB Tally (2 enable new db) || (2 enable has DB) || (1 disable)
  run(message, { choice }) {
    
    // Converting choices
    if (choice.toLowerCase() == 'enable') choice = 'yes';

    if (choice.toLowerCase() == 'disable') choice = 'no';
   
    // Save to DB 1 set
    db.set(
      `${message.member.guild.id}.serverSettings.welcomeMsg.status`,
      choice.toLowerCase()
    );

    if (choice.toLowerCase() == 'yes') {
    
      // Grab DB 1 get
      const DBInfo = db.get(
        `${message.member.guild.id}.serverSettings.welcomeMsg`
      );
     
      // DB check
      if (DBInfo.cmdUsed == null) {
        
        // Saving Defaults if none are present
        db.set(`${message.member.guild.id}.serverSettings.welcomeMsg`, {
          destination: 'direct message',
          embedTitle: 'default',
          topImageText: 'default',
          bottomImageText: 'default',
          wallpaperURL: './assets/images/friendship.png',
          imageWidth: 700,
          imageHeight: 250,
          changedByUser: message.member.displayName,
          changedByUserURL: message.member.user.displayAvatarURL(),
          timeStamp: message.createdAt,
          cmdUsed: message.content
        });
        
        const attachment = new MessageAttachment(
'./assets/images/friendship.png'
        );
        
        // Embed for New DB situation
        const embed = new MessageEmbed()
          .setTitle(
            `:white_check_mark: Welcome Message ***Enabled*** on ${message.member.guild.name}`
          )
          .setDescription(
            'You can run the `' +
              `${message.guild.commandPrefix}show-welcome-message` +
              '` command to see what it will look like!'
          )
          .addField('Message Destination', 'direct message')
          .addField(`Title`, 'default')
          .addField(`Upper Text`, 'default')
          .addField(`Lower Text`, 'defualt')
          .addField(`Image Size`, 700 + ` X ` + 250)
          .addField(`Image Path`, './assets/images/friendship.png')
          .setColor('#420626')
          .setTimestamp()
          .attachFiles(attachment)
          .setImage('attachment://friendship.png')
          .setFooter(
            message.member.displayName,
            message.member.user.displayAvatarURL()
          );

        return message.say(embed);
      
      } else {
        
        // Report Back settings from DB
        const embed = new MessageEmbed()
          .setTitle(
            `:white_check_mark: Welcome Message ***Enabled*** on ${message.member.guild.name}`
          )
          .setDescription(
            'You can run the `' +
              `${message.guild.commandPrefix}show-welcome-message` +
              '` command to see what it will look like!'
          )
          .addField('Command Used For Settings', '`' + DBInfo.cmdUsed + '`')
          .addField('Message Destination', DBInfo.destination)
          .addField(`Title`, DBInfo.embedTitle)
          .addField(`Upper Text`, DBInfo.topImageText)
          .addField(`Lower Text`, DBInfo.bottomImageText)
          .addField(
            `Image Size`,
            DBInfo.imageWidth + ` X ` + DBInfo.imageHeight
          )
          .addField(`Image Path`, DBInfo.wallpaperURL)
          .setColor('#420626')
          .setFooter(DBInfo.changedByUser, DBInfo.changedByUserURL)
          .setTimestamp(DBInfo.timeStamp);
        if (DBInfo.wallpaperURL == './assets/images/friendship.png') {
          const attachment = new MessageAttachment(
            './assets/images/friendship.png'
          );
          embed.attachFiles(attachment);
          embed.setImage('attachment://friendship.png');
        } else embed.setImage(DBInfo.wallpaperURL);
        return message.say(embed);
      }
    }
    
    // Report Settings are Disabled
    if (choice.toLowerCase() == 'no')
      message.say(
        `Welcome Message ***Disabled*** on ${message.member.guild.name}`
      );
  }
};
