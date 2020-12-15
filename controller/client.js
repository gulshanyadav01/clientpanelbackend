const { response } = require("express");
const { reset } = require("nodemon");
const { findById, emit } = require("../model/client");
const Client = require("../model/client"); 
const User = require("../model/user");

// add client into the database 

exports.addClient = async (req, res, next) => { 
    try{
        const{ firstName, lastName, email, phone, balance } = req.body; 

        const client = new Client({
            firstName, 
            lastName,
            email,
            phone,
            balance
        })
        const response  = await client.save();
        if(response){
            res.status(201).json({msg:"client is created", client})
        }
        else{
            res.status(400).json({msg:"not created"});
        }

        
            //  res.json({msg:"created", client});

    }catch(err){
        console.log(err);
    }


}

// get all cleints from the database 

exports.getClients  = async (req, res, next) => { 
    try{
        const clients = await Client.find();
        if(clients){
            res.status(200).json({clients});
        }
        else{
            return res.status(400).json({msg:"not found"});
        }
    }
    catch(error){
        console.log(error);
    }

}


// get clients by id 

exports.getClientById =  async (req, res, next) => { 

    try{
        const id  = req.params.id ;
        // console.log(id);
        const client = await Client.findById(id);
        if(client){
            res.status(200).json({client});
        }
        else{
            return res.status(400).json({msg:"not found"});
        }


    }catch(error){
        console.log(error);
    }
}


// delete the client by id 

exports.deleteClientById  = async (req, res, next) => { 
    try{
        const id = req.params.id;
        const client  = await  Client.findById(id); 
        if(client){
            await client.remove();
            res.status(201).json({msg:"client is deleted"});
        }
        else{
           return  res.status(400).json({msg:"client not found "})
        }

    }
    catch(error){
        console.log(error);
    }

}


// update the client by id 

exports.updateClientById = async(req, res, next) => { 
    try{
        const id = req.params.id; 
        const { firstName, lastName, email, phone, balance} = req.body; 

        const client = await Client.findById(id); 
        if(client){
            client.firstName = firstName; 
            client.lastName = lastName;
            client.email = email;
            client.phone = phone; 
            client.balance = balance;
            await client.save(); 
            return res.status(201).json({msg:"client is updated"});
        }
        else{
            return res.status(400).json({msg:"client is not found"});
        }

        

    }catch(error){
        console.log(error);
    }

}


exports.pushClient = async(req, res, next) => {
    try{
        const response = await User.findById(req.user.id);
        const newContact = {
            firstName:"gulshan",
            lastName:"yadav",
            email:"gulshany01@gmail.com",
            balance:"10",
            phone:"8860098313"
        }
        response.data.push(newContact);
        await response.save();
        console.log(response)
    }catch(err){
        console.log(err);
    }
    

    
}