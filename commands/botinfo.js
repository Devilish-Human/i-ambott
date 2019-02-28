const Discord = require("discord.js");
const Bot = new Discord.Client()

module.exports.run = async (bot, message, args) => {
   let bicon = bot.user.avatarURL
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Bot Created", bot.user.createdAt)

    message.channel.send(botembed);
    message.delete().catch(O_o=>{});
}

module.exports.help = {
    name: "botinfo"
}