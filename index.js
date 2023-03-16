const express = require('express');
const app = express();

const { v4: uuid } = require('uuid');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;


app.use(express.json());
app.use(cors({
    origin: CLIENT_URL
}))
app.use(express.static('public'))


app.get('/dogs', (_req, res) => {

    const dogList = JSON.parse(fs.readFileSync('./data/dogs.json'));

    const dogListIds = dogList.map((dog) => {
        dog.id = uuid();
        return dog
    })

    res.json(dogListIds)

})



app.listen(PORT, () => {

    console.log(`Listening on ${PORT}`)

})