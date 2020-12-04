const express = require("express");
const bodyParser = require("body-parser"); 
const colors = require("colors"); 
const cors = require("cors");
const dotenv = require("dotenv"); 
const mongoDb = require("./config/db");

// dotenv 
dotenv.config(); 

//database
mongoDb();

const app = express(); 


app.use(bodyParser.json()); 

app.use("/test", (req, res, next) => { 
    res.send("this is testing going on ")
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { 
    console.log(`server is running on port ${PORT}`.rainbow.bold.underline);
})


