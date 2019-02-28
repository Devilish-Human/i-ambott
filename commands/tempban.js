const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Invalid permission to preform such command.")

  let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);

  
};

module.exports.help = {
    name: "tempban"
};