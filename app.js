require('dotenv').config()
const Discord = require("discord.js")
const token = process.env.TOKEN;

const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  msg.reply("ur")
})
console.log(token)
client.login(token)