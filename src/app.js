require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { getMailsFromSender, getSystemMetrics } = require('./db');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

/**
 * Get metrics from a specific email address
 */
app.post('/mails', async (req, res) => {
    const mails = await getMailsFromSender(req.body.sender);
    const metrics = await getMetricsFromSender(req.body.sender);

    return res.status(200).json({
        metrics,
        mails
    });
});

/**
 * Get metrics from the overall system
 */
app.get('/mails', async (req, res) => {
    const metrics = await getSystemMetrics();

    return res.status(200).json(metrics);
});

const PORT = process.env.NODE_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`En écoute sur ${PORT}`);
});
