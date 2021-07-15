require('dotenv').config()
const Discord = require("discord.js")
const token = process.env['TOKEN']
const client = new Discord.Client()
const prefix = process.env['PREFIX'] || '~'
const htpdImage = process.env['HTPD_IMAGE_URL'] || 'https://i.imgflip.com/4kfa0i.png'
const htpdID = process.env['HTPD_ID'] || '864433335882350612'

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("peeping on ARKS Ship Bridge")
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
  if (command === 'htpd') {
    htpdMention(message)
  }
  if (command === 'joinhtpd') {
    const role = findHtpdRole(message)
    if (role){
      message.member.roles.add(role)
      message.reply("Success! You're now receiving pings about upcoming HTPD!")
    }
  }
  if (command === 'leavehtpd') {
    const role = findHtpdRole(message)
    if (role){
      message.member.roles.remove(role)
      message.reply("Success! You will stop receiving pings of upcoming HTPD!")
    }
  }
});
client.login(token)

function htpdMention(message) {
  if (!message.guild) return;
  const htpdChannel = findHtpdChannel(message)
  const htpdRole = findHtpdRole(message)
  if (!htpdChannel) {
    return;
  };
  if (!htpdRole) {
    return;
  }
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
  htpdChannel.fetch().then(channel => {
    channel.send("<@&" + htpdRole.id + "> HTPD Gamers, wake up for HTPD!")
    channel.send(embed)
  })
  
}

function getNextHour() {
  var d = new Date();
  d.setHours( d.getHours() + 1 );
  d.setMinutes(0);
  d.setSeconds(0);
  return d
}

function findHtpdRole(message) {
  const htpdRole = message.guild.roles.cache.find(r => r.name === "htpd")
  if (!htpdRole) {
    message.reply("Your channel has no role called @htpd. Please add @htpd role to the server.")
    return null;
  }
  return htpdRole
}

function findHtpdChannel(message) {
  const htpdChannel = message.guild.channels.cache.find(c => c.name === "htpd")
  if (!htpdChannel) {
    message.reply("Please create a channel with name 'htpd' for me to send HTPD alert there.")
    return null;
  }
  return htpdChannel
}