const mongoose = require("mongoose"); 
const colors = require("colors"); 

 const mongoDb = async () => { 
    try{
         await  mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify:true,
            useUnifiedTopology: true
         }); 
         
             console.log("connected to database".yellow.bold.underline);
         

    }
    catch(error){
        console.log(error);
    }
   


}

module.exports = mongoDb;