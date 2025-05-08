const usermodel = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const moment = require("moment");
var jwt = require('jsonwebtoken');
const secret = "asasfasfijqwijjqwmnasfa"
const { sendOtpEmail } = require("../Utils/EmailService");
const senderemail = "jangiddummy6375@gmail.com";
const mailkey = "hneo ulux pgln lgts";



exports.signup = async(req, res) =>{

    const {name, email, password, phone, role, age} = req.body
    console.log(`>>>>>>reqbody>>>>`, req.body)

    const existingmail = await usermodel.findOne({email})

    if(existingmail){
        return res.status(409).json({message: "Email is already exists"})
    }

    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
      }   

    const currTimer = moment();
    const otpTimer = currTimer.clone().add(10, "minutes"); 


    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    if(!name || !email || !password || !age){
        return res.status(400).json({message: "Name, Email, Password, Age is required"})
    }

    
    const emailSent = await sendOtpEmail(
        email,
        otp,
        name,
        password,
        senderemail,
        mailkey
      );

    if (!emailSent) {
        return res.status(500).json({ message: "Failed to send OTP email" });
    }

    const newuser = new usermodel({name, email, password: hash, phone, role, otp, age, otpTimer})
    const saveduser = await newuser.save()

    console.log(`>>>>>newuser>>>>>`, newuser)

    res.status(201).json({message:"user has been created, please check your mail for otp", saveduser});

}

  

exports.verifyOtp = async(req, res) =>{
    const {email, otp} = req.body

    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).json({message: "user not found"})
    }

    console.log(`>>>>>user>>>>`, user)

    if(user.otp !== otp){
        return res.status(400).json({message:"Incorrect OTP"})
    }

    const currTime = moment();
    if(currTime.isAfter(user.otpTimer)){
        return res.status(400).json({message:"OTP expired. Please signup again."})
    }

    user.otp = null;
    user.otpTimer = null;
    await user.save()

    res.status(200).json({message: "OTP verified successfully"})

}


exports.sendOtpOnLoginCheck = async (req, res) => {
  const { email } = req.body;
  console.log(`>>>>req.body>>>`, req.body);

  const user = await usermodel.findOne({ email });

  if (!user) {
    console.log(`>>>>user>>>>`, user);
    return res.status(404).json({ message: "User not found !!" });
  }

  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  const currTimer = moment();
  const otpTimer = currTimer.clone().add(10, "minutes");


  const emailSent = await sendOtpEmail(
    email,
    otp,
    user.name,
    user.password,
    senderemail,
    mailkey
  );

  if (!emailSent) {
    return res.status(500).json({ message: "Failed to send OTP email" });
  }

  user.otp = otp;
  user.otpTimer = otpTimer;
  await user.save();

  res.status(200).json({ message: "OTP sent successfully !!" });
};


exports.VerifyOtpOnReset = async(req, res) => {

    const {email, otp} = req.body

    const user = await usermodel.findOne({email})
    console.log(`>>>user>>>`, user)

    if(!user){
        return res.status(400).json({message: "user not found !!"})
    }

    if(user.otp !== otp){
        res.status(400).json({message: "OTP is incorrect !!"})
    }

    const currTime = moment();
    if(currTime.isAfter(user.otpTimer)){
        return res.status(400).json({message:"OTP expired. Please signup again."})
    }

    user.otp = null;
    user.otpTimer = null;
    await user.save()

    res.status(200).json({message : "OTP verified successfully"})

}

exports.resetPassword = async(req, res) => {
    const {email, newPass} = req.body

    const user = await usermodel.findOne({email})

    if(!user){
        return res.status(400).json({message: "user not found"})
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newPass, salt)

    user.password = hash
    await user.save()

    res.status(200).json({message: "Password reset successfully"})

}





exports.login = async(req, res) => {
    const {email, password} = req.body

    const user = await usermodel.findOne({email})

    console.log(`>>>user>>>>`, user)

    if(!user){
      return  res.status(401).json({message: 'Incorrect email'})
    }

    if(user.status === 'inactive'){
      return  res.status(403).json({message: 'Your account is inactive'})
    }

    const match = bcrypt.compareSync(password, user.password)

    if(!match){
      return  res.status(401).json({message: 'Incorrect password'})
    }

    const token = jwt.sign({ email, role: user.role }, secret, { expiresIn: '24h' });

    const resdata = {
        message: "Login Successful",
        user,
        token, 
        role: user.role
    }

    res.status(200).json(resdata)
}

