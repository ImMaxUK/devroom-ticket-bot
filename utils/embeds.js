require('dotenv').config({ path: './.env' });
const Discord = require("discord.js");

module.exports.primaryEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ title, description, color: process.env.PRIMARYEMBEDCOLOR })

module.exports.errorEmbed = (title="", description="") => 
    new Discord.MessageEmbed({ title, description, color: process.env.ERROREMBEDCOLOR })