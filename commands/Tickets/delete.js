const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { primaryEmbed, errorEmbed } = require('../../utils/embeds');
const discordTranscripts = require('discord-html-transcripts');
require('dotenv').config('../../.env')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deletes the ticket.'),
	async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ embeds: [errorEmbed('', 'You need the permission `MANAGE_CHANNELS` to use this command!')], ephemeral: true });
		if (!interaction.channel.name.startsWith('closed-')) return interaction.reply({ embeds: [errorEmbed('', 'This isn\'t a ticket channel!')] })
		if (interaction.channel.name.startsWith('ticket-')) return interaction.reply({ embeds: [errorEmbed('', 'This ticket isn\'t closed!')]})

		const attachment = await discordTranscripts.createTranscript(interaction.channel, { limit: -1, returnBuffer: false, fileName: 'transcript.html' });

		//find channel by ID
		const logChan = interaction.guild.channels.cache.get(process.env.LOGGINGCHANNELID)

		var channelTopic = interaction.channel.topic
		var userId = channelTopic.match(/\(([^)]+)\)/)[1]
		var user = await interaction.guild.members.fetch(userId)

		logChan.send({ embeds: [primaryEmbed('Ticket Log', `Ticket \`${interaction.channel.name}\` has been deleted by **${interaction.user}**\n\nTranscript attached below.`)] })
		logChan.send({ files: [attachment] })

		if (process.env.DMTRANSCRIPT == 'true') {
			user.send({ embeds: [primaryEmbed('', 'Your ticket has been deleted!\n\nView the transcript below.')]})
			user.send({ files: [attachment] })
		}

		interaction.reply({ embeds: [primaryEmbed('', 'Ticket deleting in 5 seconds...')]})

		//wait 5 seconds
		await new Promise(resolve => setTimeout(resolve, 5000));

		//delete channel
		interaction.channel.delete()
	}
}