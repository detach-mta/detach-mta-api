require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { getMailsFromSender } = require('./db');
const app = express();

app.use(bodyParser.json());

app.post('/mails', async (req, res) => {
    const mails = await getMailsFromSender(req.body.sender);

    return res.status(200).json(mails);
});

const PORT = process.env.NODE_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`En écoute sur ${PORT}`);
});
