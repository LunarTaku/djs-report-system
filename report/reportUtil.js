const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const supportSchema = require("../../schemas/reportSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reportutil")
    .setDescription("Settings for the report command!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a report channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to remove.")
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("replace")
        .setDescription("Replace a report channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to replace.")
            .addChannelTypes(ChannelType.GuildText)
        )
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "remove") {
      const channel = interaction.options.getChannel("channel");

      const channelId = supportSchema.findOne({ channelId: channel.id });
      const supportSys = await supportSchema.findOne({ guildId: interaction.guild.id });

      if (!supportSys.channelId === channel.id) {
        await interaction.reply({
          content: "The channel is not in the database!",
          ephemeral: true,
        });
        return;
      }

      if (channelId) {
        supportSchema
          .findOneAndDelete({
            channelId: channel.id,
            guildId: interaction.guild.id,
          })
          .catch(console.error);

        const successEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setDescription(
            `<:FIJI_settings:999672135700189256> Successfully removed the report channel from ${channel.name}!`
          );
        await interaction.reply({
          embeds: [successEmbed],
          ephemeral: true,
        });
      }
    }

    if (interaction.options.getSubcommand() === "replace") {
      const channel = interaction.options.getChannel("channel");

      const channelId = supportSchema.findOne({ channelId: channel.id });
      const supportSys = await supportSchema.findOne({ guildId: interaction.guild.id });

      if (!supportSys.channelId === channel.id) {
        await interaction.reply({
          content: "You chose the wrong channel!",
          ephemeral: true,
        });
        return;
      }

      if(channelId) {
        supportSchema
          .findOneAndUpdate({
            channelId: channel.id,
            guildId: interaction.guild.id,
          }, {
            channelId: channel.id,
          })
          .catch(console.error);

        const successEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setDescription(
            `<:FIJI_settings:999672135700189256> Successfully replaced the report channel with ${channel.name}!`
          );
        await interaction.reply({
          embeds: [successEmbed],
          ephemeral: true,
        });
      }


    }

  },
};
