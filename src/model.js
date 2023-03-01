const mongoose = require('mongoose');

const mailSchema = {
    date: String,
    inboundSize: Number,
    outboundSize: Number,
    sender: String,
    recipientsCount: Number,
    hasAttachments: Boolean
}
const schema = new mongoose.Schema(mailSchema);

module.exports = mongoose.model('Mail', schema);