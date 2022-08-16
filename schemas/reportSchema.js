const { Schema, model } = require("mongoose");
const userReportSchema = new Schema({
  guildId: String,
  channelId: String,
});

module.exports = model("reportSchema", userReportSchema, "reportUserSchema");
