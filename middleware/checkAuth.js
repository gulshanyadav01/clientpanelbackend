const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        // console.log(req.headers.authorization)
        const token =  req.header('x-auth-token')
    //  authorization: "Bearer TOKEN"
     if(!token){
         return res.status(401).json({msg:"No Token"});

     }
     
        const decodedToken =  jwt.verify(token, "supersecret_don't_share");
        req.user = {id: decodedToken.userId};
        // console.log(req.user)
        next();

    }catch(error){
        return res.status(401).json({msg:"not authorize"});
    }

}
