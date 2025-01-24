const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
 try{
  const { email, password } = req.body;
  // Validate Request
  if (!email || !password) {
    return res.status(400).json({message:"Blank Id and Passwords field"})
    
  }
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(401).json({message:"No user found,please register"})
    
  }
  if(user.password == password){
  const token = jwt.sign({ id: user.ID, email: user.email },process.env.JWT_SECRET);
  res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    const { ID, name, email } = user;
    return res.status(200).json({
      ID,
      name,
      email,
      token,
    });
} else {
   return  res.status(401).json({message:"Invalid Credentials"})
}
 }catch(err){
  return  res.status(500).json({message: "Internal Server Error"})
 }
  };


const userRegistration = async(req,res)=>{
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password ) {
        return res.status(400).json({message:"Please fillup all the required fields"})
      }
      if (password.length < 6) {
        return res.status(400).json({message:"Incorrect Password structure"})
        
      }
      const userExists = await User.findOne({ email }).catch((err) => {
          res.status(500).json({message:"Internal Server error"})
          
        });
    
      if (userExists) {
       return  res.status(400).json({message:"User Account Exists"})
      }
      const user = await User.create({
        name,
        email,
        password,
        phone
      })
     return  res.status(200).json({ message:"User is created successfully"})
}

  module.exports={
    loginUser,
    userRegistration
  }