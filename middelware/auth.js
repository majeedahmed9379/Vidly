const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied, No token provided");
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        //we have the payload in decoded
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err.message)
        res.status(400).send("Invalid token");
    }
    
    
}

exports.auth = auth;