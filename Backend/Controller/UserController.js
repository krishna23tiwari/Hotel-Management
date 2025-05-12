const usermodel = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const moment = require("moment");
var jwt = require('jsonwebtoken');
const secret = "asasfasfijqwijjqwmnasfa"
const { sendOtpEmail } = require("../Utils/EmailService");
const senderemail = "jangiddummy6375@gmail.com";
const mailkey = "hneo ulux pgln lgts";
const fileupload = require('express-fileupload')
const{uploadFile} = require('../Utils/ImagesUpload')



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



exports.userPasswordReset = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const userEmail = req.user.email; // Logged-in user's email only

    console.log(`>>>>>userEmail>>>>`, userEmail)

    const user = await usermodel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful", email: userEmail });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





exports.updateUserNamePhoneGenderAge = async (req, res) => {
  const { email, name, phone, age } = req.body;

  let imageUrl = "";
  if (req.files) {
    const uploadResults = await uploadFile(req.files);
    if (uploadResults.length) {
      imageUrl = uploadResults[0].secure_url;
    }
  }

  const updateData = { name, phone, age };
  if (imageUrl) updateData.image = imageUrl;

  const updatedUser = await usermodel.findOneAndUpdate(
    { email },
    updateData,
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "Information has been updated",
    updatedUser
  });
};


exports.getUserProfile = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        image: user.image // Assuming the user's profile image is stored in the 'image' field
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUserInfo = async(req, res) =>{
    
    const user = await usermodel.find()

    if(!user){
      return res.status(400).json({meassage: "user info not found !!"})
    }
    return res.status(200).json({message: "User info has been found", users: user})

}

// exports.getAllUserInfosingle = async(req, res) =>{
//    const {email} = req.body 
//   const user = await usermodel.findOne({email})

//   if(!user){
//     return res.status(400).json({meassage: "user info not found !!"})
//   }
//   return res.status(200).json({message: "User info has been found",     user: {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     status: user.status,
//     age: user.age,
//     image: user.image,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//   },
// })

// }


exports.getUserInfodata = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you're using auth middleware to attach req.user
    console.log(`>>>userID>>>>`, userId)
    const user = await usermodel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user }); // Return user object directly
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};




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
        role: user.role,
        email
    }

    res.status(200).json(resdata)
}

