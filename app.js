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

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));

app.use("/test", (req, res, next) => { 
    res.send("this is testing going on ")
})

// client router
const clientRouter = require("./routes/client");
const authRouter = require("./routes/user");

app.use("/user/", authRouter);

app.use("/client", clientRouter);


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { 
    console.log(`server is running on port ${PORT}`.rainbow.bold.underline);
})


