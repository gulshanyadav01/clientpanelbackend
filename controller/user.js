const User = require("../model/user");

exports.getSignup = async (req, res, next) => {
    try{
        const { name, email, password } = req.body; 
        const user = new User({
            name, 
            email,
            password
        })
        const response = await user.save();
        if(response){
            res.status(201).json({msg:"user is created"});
        }
        else{
            res.status(404).json({msg:"user is not created"});
        }

    }catch(error){
        console.log(error);
    }
   
}