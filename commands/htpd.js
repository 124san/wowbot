function getNextHour() {
  var d = new Date();
  d.setHours( d.getHours() + 1 );
  d.setMinutes(0);
  d.setSeconds(0);
  return d
}

const htpdImage = process.env['HTPD_IMAGE_URL'] || 'https://i.imgflip.com/4kfa0i.png'
const sampleID = '864433335882350612'
const Discord = require('discord.js')

module.exports = {
	name: 'htpd',
	description: 'Send HTPD alert to all servers',
	execute(client, message, args) {
		const htpdChannels = client.channels.cache.filter(c => c.name === 'htpd')
    nextHour = getNextHour()
    const embed = new Discord.MessageEmbed()
    // Set the title of the field
    .setTitle('HTPD!')
    // Set the color of the embed
    .setColor(0xff0000)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setImage(htpdImage)
    // Set the main content of the embed
    .setDescription("Emergency announcement! We're preparing for the final attack on Mothership Shiva at time listed below. Please get ready! \n"
    +nextHour.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })+" in Pacific\n"
    +nextHour.toLocaleString('en-US', { timeZone: 'America/New_York' })+" in Eastern\n"
    +nextHour.toLocaleString('en-US', { timeZone: 'UTC' })+" in UTC\n"
    +nextHour.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })+" in UTC+8\n");
    htpdChannels.forEach(htpdChannel => {
      htpdChannel.fetch().then(channel => {
        var role = channel.guild.roles.cache.find(r => r.name === 'htpd')
        if (!role) {
          channel.send("Your channel has no role called @htpd. Please add @htpd role to the server.")
          role = {id: sampleID}
        }
        channel.send("<@&" + role.id + "> HTPD Gamers, wake up for HTPD!")
        channel.send(embed)
      })
    })
	},
};