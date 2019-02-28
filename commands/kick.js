const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return errors.cantfindUser(message.channel);
    let kReason = args.join(" ").slice(22);
    if(!kReason) kReason = "Unspecified";
    if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick Information~")
    .setColor("#e56b00")
    .addField("User Kicked", `[${kUser}], [ID: ${kUser.id}]`)
    .addField("Kicked By", `[<@${message.author.id}>], [ID ${message.author.id}]`)
    .addField("Kicked From Channel", message.channel)
    .addField("Time of Kick", message.createdAt)
    .addField("Kick Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Can't find logs channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    message.delete().catch(O_o=>{});
}

module.exports.help = {
  name:"kick"
}