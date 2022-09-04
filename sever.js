const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

require('dotenv').config();

const axios = require('axios');

const PORT = process.env.PORT; //<-- this is my localhost PORT IP

//testRoute ↴
// http://localhost:3333/test
server.get('/test', (req, res)=>{
    //console.log("TAREQ");
    res.send("Hello this is the test ROUTE for port");// this is okay
})

// home route ↴
// http://localhost:3333/
server.get('/', (req, res) => {
    //console.log("HOME ROUTE!!!");
    res.send("THIS IS THE HOME ROUTE!"); // this is okay too 
})

//weatherRoute ↴
// http://localhost:3333/getWeather?weatherQuery=city <-- endpoint!
server.get("/getWeather", getWeatherHandler);
async function getWeatherHandler(req, res) {
    const weatherQ = req.query.weatherQuery;
    const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQ}&key=${process.env.weather_key}&lang=ar&days=3`;

    try{
        let weatherResponce = await axios.get(weatherURL);
        //console.log("HEY!");
        //res.send(weatherResponce.data);
        //console.log(weatherResponce.data);
        let weatherArr = weatherResponce.data.data.map(val => {
            //console.log(val);
            //console.log("TAREQ");
            return new weatherInformation(val);

        })
        res.send(weatherArr);
    }
    catch
    {
        //ERROR!
    }
}

class weatherInformation {
    constructor(val){
        this.description = val.weather.description;
        this.datetime = val.datetime;
    }
}


// this is a listen server
server.listen(PORT, () => {
    console.log(`this is PORT -> ${PORT}`);
    //console.log(PORT);
})