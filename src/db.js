require('dotenv').config();
const mongoose = require('mongoose');
const Mail = require('./model');

const db = {

    async getMailsFromSender(sender) {
        await mongoose.connect(process.env.MONGODB_URL, {
            authSource: 'admin',
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS
        });

        const documents = await Mail.find({ sender }).exec();

        return documents;
    }

};

module.exports = db;