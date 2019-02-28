const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute) return message.reply("The user is invalid!");
    if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("Unable to execute command!");

    let muteRole = message.guild.roles.find('name', "muted");

    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
        catch(e){
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if(!mutetime) return message.reply("Specify an time!");

    await(toMute.addRole(muteRole.id));
    message.reply(`<@${toMute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        toMute.removeRole(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted!`);
    }, ms(mutetime));
 }

module.exports.help = {
    name: "tempmute"
};