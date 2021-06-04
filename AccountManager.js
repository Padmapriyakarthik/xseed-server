
const bcrypt=require('bcrypt');
const {createUser, findUser,confirmUser}=require("./User")
const {JWT,JWT_SECRET,baseurl}=require('./Require')
const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'padmapriyakarthik97@gmail.com',
        pass:process.env.PASSWORD
    }
});

const signUp=async(req,res)=>{
    try {
        const {email}=req.body
        const users=await findUser(req.body.email)
        if(users){
            res.status(400).json({message:"Account already exists with this email",status:400})
        }
        else{
            let salt=await bcrypt.genSalt(10);//key to encrypt password
            let hash=await bcrypt.hash(req.body.password,salt);
            let user=await createUser(email,req.body.name,hash,0)
            if(user){
                const token =  await JWT.sign({email},JWT_SECRET)
                let info = await transporter.sendMail({
                from: 'padmapriyakarthik97@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Account activation", // Subject line
                html: '<p>Hai '+req.body.name+' !</p> <p>We are delighted to have you on board</p>Click <a href="https://xseed-client.herokuapp.com/activate-user/' + token + '">here</a> to activate your account'
                } ,function(error,info){if(error){console.log(error)}else{console.log(info.response)}}) 
                      res.status(200).json({
                        message:"Account activation link has been sent to your mail.",status:200
                      })
            }
        }
    }catch (error) {
        console.log(error);
    } 
}

const activateToken=async(req,res)=>{
    try{
        
        JWT.verify(req.params.token,
            JWT_SECRET,
            async(err,decode)=>{
                if(decode!==undefined){
                   const user=await confirmUser(decode.email);
                    if(user)
                    {
                     res.redirect(baseurl+"/redirectlogin");
                    }          
                }else{
                    res.status(401).json({message:"invalid token"});
                }
            });
       }
    catch(error){
        console.log(error);
    }
}

const signIn=async(req,res)=>{
    try{
        const {email}=req.body
        const users=await findUser(email)
        if(users)
        {
            let isvalid =await bcrypt.compare(req.body.password,users.password);   
            if(isvalid)
            {
                if(users.confirmed)
                {
                    let token=await JWT.sign({email},JWT_SECRET)
                    res.status(200).json({message:"Login Success",token,email});
                }else{
                    res.status(400).json({message:"Account Not Activated"});
                }
            }
            else{
                res.status(400).json({message:"Invalid Password"})
            }
        }
        else{
            res.status(400).json({message:"Account Does Not Exists"});// 401 unauthorized
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports={signUp,activateToken,signIn}