const findRole = require('../functions/findRole.js')
module.exports = {
	name: 'joinhtpd',
	description: 'Join HTPD notification',
	execute(client, message, args) {
		if (!message.guild) return;
    const role = findRole(message)
    if (role){
      message.member.roles.add(role)
      message.reply("Success! You're now receiving pings about upcoming HTPD!")
    }
	},
};