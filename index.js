const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;


app.use(express.json());
app.use(cors({
    origin: CLIENT_URL
}))
app.use(express.static('public'))




app.listen(PORT, () => {

    console.log(`Listening on ${PORT}`)

})