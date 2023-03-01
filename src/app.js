require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mailsRouter = require("./routes/mail");
const swaggerOptions = require('./swagger');
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});


app.get('/ping', (_, res) => res.send('Hello friend'));
app.use('/mails', mailsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.NODE_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`En écoute sur ${PORT}`);
});
