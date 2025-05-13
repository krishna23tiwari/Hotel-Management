const jwt = require('jsonwebtoken')
const secret = "asasfasfijqwijjqwmnasfa"
const usermodel = require('../Model/UserModel')

module.exports = async(req, res, next) =>{
    const barrertoken = req.headers.authorization

    console.log(`>>>>>barrertoken>>>>>`, barrertoken)

    if(!barrertoken){
        return res.status(401).json({message: "No token found"})
    }
                                                                                                                        
    const token = barrertoken.split(" ")[1]
    console.log(`>>>token>>>>`, token)

    if(!token){
       return res.status(401).json({message: "Token not found"})
    }

    const decode = jwt.verify(token,secret)
    console.log(`>>>>decode>>>>`, decode)

    const user = await usermodel.findOne({email: decode.email})
    console.log(`>>>>user>>>>`, user)

    if(!user){
        return res.status(404).json({message: "user not found"})
    }   

    req.user = user

    next()
}


