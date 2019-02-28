const botconfig = require("./botconfig.json");
const tokenholder = process.env.token
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("guildMemberAdd", async member => {
  let welcomechann = member.guild.channels.find(`name`,"user-messages");
  welcomechann.send(`YAY! ${member.user.username} has joined the party at ${member.guild.name}!`)
});

bot.on("guildMemberRemove", async member => {
  let leavechann = member.guild.channels.find(`name`,"user-messages");
  leavechann.send(`I can't belive ${member.user.username} left us behind`);
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  bot.user.setActivity("coding Discord.js", {type: "PLAYING"});
});

bot.on("idle", async() => {
  bot.user.setActivity("Orb War Gameplays", {type: "WATCHING"})
});

bot.on("message", async message => {
  if(message.author.bot) return; 
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(tokenholder.token);