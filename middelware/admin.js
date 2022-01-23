function isadmin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send("Forbidden request");    //403: forbidden request
    next();
    
}

module.exports = {isadmin};