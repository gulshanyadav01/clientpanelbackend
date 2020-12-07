const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
     // authorization: "Bearer TOKEN"
     if(!token){
         return res.status(401).json({msg:"authentication failed"});

     }
     
 const decodedToken =  jwt.verify(token, "supersecret_don't_share");
 req.userData = {userId: decodedToken.userId};
 next();

    }catch(error){
        console.log(error);

    }

}
