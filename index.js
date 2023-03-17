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

    const allDogs = fs.readFileSync('./data/dogs.json')
    res.send(allDogs)

})


app.put('/winner', (req, res) => {
    
    const { winningId, losingId } = req.body
    console.log(winningId, losingId)


    const dogList = JSON.parse(fs.readFileSync('./data/dogs.json'));


    const winningDog = dogList.find((dog) => dog.id === winningId )
    let wins = parseInt(winningDog.wins)
    wins++
    winningDog.wins = wins.toString()

    const updatedDogList1 = dogList.filter((dog) => dog !== winningDog )
    updatedDogList1.push(winningDog);
    
    const updatedDogListJson1 = JSON.stringify(updatedDogList1);
    fs.writeFileSync('./data/dogs.json', updatedDogListJson1)


    
    const losingDog = dogList.find((dog) => dog.id === losingId)
    let losses = parseInt(losingDog.losses)
    losses++
    losingDog.losses = losses.toString()

    const updatedDogList2 = dogList.filter((dog) => dog !== losingDog )
    updatedDogList2.push(losingDog);

    const updatedDogListJson2 = JSON.stringify(updatedDogList2);
    fs.writeFileSync('./data/dogs.json', updatedDogListJson2)



    let randomIndex = () => Math.floor(Math.random() * 12)

    let newOpponent = null 

    do {
        newOpponent = dogList[randomIndex()]
    }
    while( newOpponent.id === (winningDog.id || losingDog.id) )

    res.json(newOpponent)
})


app.get('/leaderboard', (_req, res) => {

    const allDogs = JSON.parse(fs.readFileSync('./data/dogs.json'))

    const leaderBoard = allDogs.map((dog) => {

        const winningPercentage = parseInt(dog.wins) / (parseInt(dog.wins) + parseInt(dog.losses))
        dog.winningPercentage = winningPercentage.toString();
        return dog
    })

    

    leaderBoard.sort((a,b) => {
        return b.winningPercentage - a.winningPercentage 
    })


    res.json(leaderBoard)

})


app.listen(PORT, () => {

    console.log(`Listening on ${PORT}`)

})