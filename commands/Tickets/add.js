const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { primaryEmbed, errorEmbed } = require('../../utils/embeds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds the specified user from the ticket.')
		.addMentionableOption(option =>
			option.setName('user')
			.setDescription('The user to add to the ticket.')
			.setRequired(true)),
	async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({ embeds: [errorEmbed('', 'You need the permission `MANAGE_CHANNELS` to use this command!')], ephemeral: true });
		if (!interaction.channel.name.startsWith('ticket-')) return interaction.reply({ embeds: [errorEmbed('', 'This isn\'t a ticket channel!')] })
		
		interaction.channel.permissionOverwrites.create(interaction.options.getMentionable('user'), { VIEW_CHANNEL: true } )

		interaction.reply({
			embeds: [primaryEmbed('', 'Added the user to the ticket!')],
		})
    }
}