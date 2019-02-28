const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let Usr = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!Usr) return message.channel.send("Couldn't find user.");

    let usrEmbed = new Discord.RichEmbed()
    .addField("Name", `${Usr.user.username}`)
    .addField("Joined Discord", `Created Account in ${Usr.user.createdAt}`)
   // .addField("Joined Server", `Joined in ${Usr.guild.user.cre}`)

    message.channel.send(usrEmbed);
}

module.exports.help = {
    name: "userinfo"
}