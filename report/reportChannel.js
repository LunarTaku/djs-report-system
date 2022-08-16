const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
const supportSchema = require("../../schemas/reportSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reportchannel")
    .setDescription("Set the channel to get reports to !")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((channel) => {
      return channel
        .setName("channel")
        .setRequired(true)
        .setDescription("Channel to send the message to.");
    }),

  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const channelId = supportSchema.findOne({ channelId: channel.id });
    const supportSys = await supportSchema.findOne({ guildId: interaction.guild.id });

    if (channelId === channel.id) {
      await interaction.reply({
        content: "You can only have one report channel per guild!",
        ephemeral: true,
      });
      return;
    }

    reportSchema = await new supportSchema({
      _id: mongoose.Types.ObjectId(),
      guildId: interaction.guild.id,
      channelId: channel.id,
    });

    await reportSchema.save().catch(console.error);
    const successEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setDescription(
        `<:FIJI_settings:999672135700189256> Successfully set the report channel to ${channel.name}!`
      );
    await interaction.reply({
      embeds: [successEmbed],
      ephemeral: true,
    });
  },
};
