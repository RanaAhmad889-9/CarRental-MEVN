const Auth = require("../Model/Auth");

exports.login=async(req,res,next)=>{
    const {email,password}=req.body;

    const login=await Auth.findOne({email})
    if(login){
        if(login.password === password){
            res.session.user={
                id:login._id,
                name:login.name,
                email:login.email,
                password:login.password
            }
            req.session.save((err)=>{
                if(err){
                        console.log("Failed to save session");
                  return res.status(500).json({ message: "Failed to save session" });
                }

                return res.status(200).json({
                    login:{login}

            })
            })
        }else{
                    console.log("Wrong password for:", email);
            return res.status(400).send("Wrong password");
        }
    }
}
exports.signup=async(req,res,next)=>{
    const {email,name,password}=req.body;

    try{
const find=await Auth.findOne({email})
   
if(!find){
    const signup=await Auth({email,name,password})

    signup.save().then(()=>{
        console.log("registered")
        return res.status(200).json({message:"Signuped"})
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({
            message:"Problem in saving user"
        })
    })

}else{
    return res.json
}
     }catch(err){
        console.log("error in signup catch",err)
     }
}