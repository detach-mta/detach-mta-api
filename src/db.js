require('dotenv').config();
const mongoose = require('mongoose');
const Mail = require('./model');

const db = {

    async connect() {
        await mongoose.connect(process.env.MONGODB_URL, {
            authSource: 'admin',
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS
        });
    },

    async getMailsFromSender(sender) {
        await this.connect();

        const documents = await Mail.find({ sender }).exec();

        return documents;
    },

    async getSystemMetrics() {
        await this.connect();

        const agg = await Mail.aggregate([{
            $group: {
                totalInbound: { $sum: "$inboundSize" },
                totalOutbound: { $sum: "$outboundSize" }
            }
        }]).exec();

        const totalCount = await Mail.count();
        const totalAttachments = await Mail.count({ hasAttachments: true });
    
        return {
            ...agg,
            totalCount,
            totalAttachments
        };
    }

};

module.exports = db;