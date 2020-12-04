const Client = require("../model/client"); 

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