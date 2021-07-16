module.exports = message => {
  const htpdRole = message.guild.roles.cache.find(r => r.name === "htpd")
  if (!htpdRole) {
    message.reply("Guardian, your channel has no role called @htpd. Please add @htpd role to the server.")
    return null;
  }
  return htpdRole
}