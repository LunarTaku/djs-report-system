const { Schema, model } = require("mongoose");
const userReportSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  channelId: String,
});

module.exports = model("reportSchema", userReportSchema, "reportUserSchema");
