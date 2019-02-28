const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = "Unspecified";
    if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban Information~")
    .setColor("#e56b00")
    .addField("User Banned", `[${bUser}], [ID: ${bUser.id}]`)
    .addField("Banned By", `[<@${message.author.id}>], [ID ${message.author.id}]`)
    .addField("Banned From Channel", message.channel)
    .addField("Time of Ban", message.createdAt)
    .addField("Ban Reason", bReason);

    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("Can't find logs channel.");

    message.guild.member(bUser).ban(bReason);
    logs.send(banEmbed);
    message.delete().catch(O_o=>{});
}

module.exports.help = {
  name:"ban"
}