const User = require("../model/user");
const bcyrpt = require("bcryptjs")

exports.getSignup = async (req, res, next) => {
    try{
        const { name, email, password } = req.body; 
        let  user  = await User.findOne({email: email});
        if(user){
            return res.status(404).json({msg:"user is already created please try different one"}) 
        }
        let hashPassword;
        hashPassword = await bcyrpt.hash(password, 12);
        if(!hashPassword){
            return res.status(404).json({msg:"user is not created"});
        }
        
         user = new User({
            name, 
            email,
            password:hashPassword
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


exports.Login = async(req, res, next) => { 
    try{
        const{ email, password} = req.body;
        const user = await User.findOne({email:email, password:password});
        if(user){
            res.status(200).json({msg:"this is your user", user});
        }
        else{
            return res.status(404).json({msg:"user is not found please sign up"});
        }
        
    }catch(error) {
        console.log(error);
    }
}