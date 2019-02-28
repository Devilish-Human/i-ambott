const Discord = require("discord.js");
const botconfig = require("../botconfig.json")

module.exports.run = async(bot, message, args) => {
    let prefix = botconfig.prefix
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Help")
    .setColor()
    .addField("Prefix", `${prefix} | MEMBER+`)
    .addField("Report User", `${prefix}report <@user> <reason> | report an user that is breaking the rule or being rude. | MEMBER+`) 
    .addField("Bot Info", `${prefix}botinfo | see information about the bot | MEMBER+`)
    .addField("Server Info", `${prefix}serverinfo |see information about the server | MEMBER+`)
    .addField("User Info", `${prefix}userinfo <@user> | see information about a user | MEMBER+`)
    .addField("Warn Command", `${prefix}warn <@user> <reason> | warn the player | MOD+`)
    .addField("Warnings Command", `${prefix}warnings <@user> | view how many times an user has been warned | MOD+`)
    .addField("Ban Command", `${prefix}ban <@user> <reason> | permanently ban a user | MOD+`)
    .addField("Kick Command", `${prefix}kick <@user> <reason> | kick an user | MOD+`)
    .addField("Tempmute Command", `${prefix}tempmute <@user> <h/m/s> | temporarly mute an user | MOD+`)
   // .addField("Tempban Command", `${prefix}tempban <@user> <d/h/m> <reason> | temporarly ban an user | MOD+`)

    message.channel.send(helpEmbed);
};

module.exports.help = {
    name: "help"
}