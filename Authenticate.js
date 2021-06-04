const {JWT,JWT_SECRET}=require('./Require')

async function authenticate(req,res,next){
    
        if(req.headers.authorization!==undefined)
        {
            JWT.verify(req.headers.authorization,
                JWT_SECRET,
                (err,decode)=>{
                    if(decode!==undefined){
                        req.body.email=decode.email;
                        next();
                    }else{
                        res.status(401).json({message:"invalid token"});
                    }
                });
        }else{
            res.status(401).json({message:"No token"})
        }
}

module.exports={authenticate};