const User = require("../model/user");
const bcyrpt = require("bcryptjs")
const jwt = require("jsonwebtoken");

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

        let createdUser = await user.save();

        let token;
        token = jwt.sign({
            userId:createdUser._id,
            email: createdUser.email
        }, "supersecret_don't_share", {expiresIn:360000});
         res.status(201).json({token});

       
        

    }catch(error){
        console.log(error);
    }
   
}


exports.Login = async(req, res, next) => { 
    try{
        const{ email, password} = req.body;
        const user = await User.findOne({email:email});
    
        if(user){
            const isValidPass = await bcyrpt.compare(password, user.password);
            if(!isValidPass){
                return res.status(404).json({msg:"invalid credential please try again later"})
            }
            let token;
            token = jwt.sign({
                userId:user._id,
                email: user.email
            }, "supersecret_don't_share", {expiresIn: "1h"});

            return res.status(200).json({token: token});

        }
        if(!user){
            return res.status(404).json({msg:"user is not found please sign up"});

        }
        
    }catch(error) {
        console.log(error);
    }
}


// exports.getUserInfo = async(req, res, next) => {
//     try {
//         const user = await (await User.findById(req.user.id).populate('book')).execPopulate()

//         if (!user) {
//             return res.status(401).json({ msg: "Not authorized" })
//         }

//         res.status(200).json({ user });
//     } catch (err) {
//         console.log(err);
//     }
// }



exports.getUserDetails = async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(401).json({ msg: "Not authorized" })
        }
        res.status(200).json({user});
    }catch(error){
        console.log(error);
    }

}