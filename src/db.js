require('dotenv').config();
const mongoose = require('mongoose');
const Mail = require('./model');

async function connect() {
    await mongoose.connect(process.env.MONGODB_URL, {
        authSource: 'admin',
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASS
    });
}

const db = {

    /**
     * 
     * @param {string} sender
     * @returns {{date:string, inboundSize:number, outboundSize:number, recipientsCount:number, hasAttachments: boolean}[]}
     */
    async getMailsFromSender(sender) {
        await connect();

        const documents = await Mail.find({ sender }).exec();

        return documents;
    },

    /**
     * 
     * @param {string} sender
     * @returns {{totalInbound: number, totalOutbound: number, totalCount: number,totalAttachments: number}}
     */
    async getMetricsFromSender(sender) {
        await connect();

        const agg = await Mail.aggregate([{
            $match: {
                sender
            }
        },
        {
            $group: {
                "_id": 1,
                totalInbound: { $sum: "$inboundSize" },
                totalOutbound: { $sum: "$outboundSize" },
                totalCount: { $sum: 1 }
            }
        }]);

        const totalAttachments = await Mail.count({ sender, hasAttachments: true });

        return {
            ...agg[0],
            totalAttachments
        };
    },

    /**
     * 
     * @returns {{totalInbound: number, totalOutbound: number, totalCount: number,totalAttachments: number}}
     */
    async getSystemMetrics() {
        await connect();

        const agg = await Mail.aggregate([{
            $group: {
                "_id": 1,
                totalInbound: { $sum: "$inboundSize" },
                totalOutbound: { $sum: "$outboundSize" },
                totalCount: { $sum: 1 }
            }
        }]);

        const totalAttachments = await Mail.count({ hasAttachments: true });

        return {
            ...agg[0],
            totalAttachments
        };
    }

};

module.exports = db;