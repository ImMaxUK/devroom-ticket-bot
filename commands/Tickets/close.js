const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { primaryEmbed, errorEmbed } = require('../../utils/embeds');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Closes the ticket.'),
	async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ embeds: [errorEmbed('', 'You need the permission `MANAGE_CHANNELS` to use this command!')], ephemeral: true });
		if (!interaction.channel.name.startsWith('ticket-')) return interaction.reply({ embeds: [errorEmbed('', 'This isn\'t a ticket channel!')] })

		var channelTopic = interaction.channel.topic
		var userId = channelTopic.match(/\(([^)]+)\)/)[1]
		var user = await interaction.guild.members.fetch(userId)

		//remove user from channel
		interaction.channel.permissionOverwrites.create(user, { VIEW_CHANNEL: false })

		interaction.reply({
			embeds: [primaryEmbed('', 'The ticket has been closed!')],
		})

		const attachment = await discordTranscripts.createTranscript(interaction.channel, { limit: -1, returnBuffer: false, fileName: 'transcript.html' });

		interaction.channel.send({
			files: [attachment]
		})

		//replace ticket in channel name with closed
		interaction.channel.setName(interaction.channel.name.replace('ticket-', 'closed-'))
    }
}