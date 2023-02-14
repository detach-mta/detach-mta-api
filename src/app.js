require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.NODE_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`En écoute sur ${PORT}`);
});
