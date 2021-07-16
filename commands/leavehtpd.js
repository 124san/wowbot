const findRole = require('../functions/findRole.js')
module.exports = {
	name: 'leavehtpd',
	description: 'Leave HTPD notification',
	execute(client, message, args) {
		if (!message.guild) return;
    const role = findRole(message)
    if (role){
      message.member.roles.remove(role)
      message.reply("Success! You will stop receiving pings of upcoming HTPD!")
    }
	},
};