require('dotenv').config()
const Discord = require("discord.js")
const token = process.env['TOKEN']
const client = new Discord.Client()
const prefix = process.env['PREFIX'] || '~'
const htpdChannel = process.env['HTPD_CHANNEL'] || '587411617268891707'
const htpdImage = process.env['HTPD_IMAGE_URL'] || 'https://i.imgflip.com/4kfa0i.png'
const htpdID = process.env['HTPD_ID'] || '864433335882350612'

var htpdChannels = ['587411617268891707']

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
  if (command === 'htpd') {
    htpdMention(message)
  }
  if (command === 'addc') {
    channelID = args.shift();
    if (!channelID) {
      message.reply("Usage: "+prefix+"addc [Channel ID]")
      return;
    }
    client.channels.fetch(channelID).then(channel => {
      htpdChannels.push(channelID)
      message.reply("Successfully added channel "+channel.name)
    })
  }
  if (command === 'joinhtpd') {
    const role = message.guild.roles.cache.find(role => role.name === 'htpd')
    if (role){
      message.member.roles.add(role)
      message.reply("Success! You're now receiving pings about upcoming HTPD!")
    }
    else {
      message.reply("Your channel has no role called @htpd. Please add @htpd role to the server.")
    }
  }
  if (command === 'leavehtpd') {
    const role = message.guild.roles.cache.find(role => role.name === 'htpd')
    if (role){
      message.member.roles.remove(role)
      message.reply("Success! You will stop receiving pings of upcoming HTPD!")
    }
    else {
      message.reply("Your channel has no role called @htpd. Please add @htpd role to the server.")
    }
  }
});
client.login(token)

function htpdMention(message) {
  if (!message.guild) return;
  const htpdChannel = message.guild.channels.cache.find(c => c.name = "htpd")
  if (!htpdChannel) return;
  nextHour = getNextHour()
  const embed = new Discord.MessageEmbed()
  // Set the title of the field
  .setTitle('HTPD coming soon!')
  // Set the color of the embed
  .setColor(0xff0000)
  .setAuthor(message.author.username, message.author.avatarURL())
  .setImage(htpdImage)
  // Set the main content of the embed
  .setDescription("HTPD is starting soon! \n"+nextHour.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })+" in Pacific\n"
  +nextHour.toLocaleString('en-US', { timeZone: 'America/New_York' })+" in Eastern\n"
  +nextHour.toLocaleString('en-US', { timeZone: 'UTC' })+" in UTC\n"
  +nextHour.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })+" in UTC+8\n");
  htpdChannels.forEach(id => {
    client.channels.fetch(id).then(channel => {
      channel.send("<@&" + htpdID + "> HTPD Gamers, wake up for HTPD!")
      channel.send(embed)
    }).catch(console.error);
  })

  
}

function getNextHour() {
  var d = new Date();
  d.setHours( d.getHours() + 1 );
  d.setMinutes(0);
  d.setSeconds(0);
  return d
}