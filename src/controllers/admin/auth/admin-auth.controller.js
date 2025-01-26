const Admin = require("../../../models/admin-user.model");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        // Validate Request
        if (!email || !password) {
            return res.status(400).json({message:"Blank Id and Passwords field"})
            
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({message:"No user found,please register"})
        }
        if(admin.password == password){
        const token = jwt.sign({ id: admin.ID, admin: admin.email, tokenVersion: admin.tokenVersion},process.env.JWT_SECRET);
        admin.tokenVersion += 1;
        await admin.save();
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
            sameSite: "none",
            secure: true,
            });
            const { ID, name, email } = admin;
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

const registerAdmin = async(req,res) =>{
    try{
        const { name, email, password, created_by} = req.body;
        if (!name || !email || !password || !created_by) {
            return res.status(400).json({message:"Please fillup all the required fields"})
        }
        if (password.length < 6) {
            return res.status(400).json({message:"Incorrect Password structure"})    
        }
        const adminExists = await Admin.findOne({ email }).catch((err) => {
                res.status(500).json({message:"Internal Server error"})
            });
        
        if (adminExists) {
            return  res.status(400).json({message:"Admin Account Exists"})
        }
        const admin = await Admin.create({
            name,
            email,
            password,
            created_by
        })
            return  res.status(200).json({ message:"Admin is created successfully"})
            
    }catch(err){
        return  res.status(500).json({message: "Internal Server Error"})
    }
}
  module.exports={
    loginAdmin,
    registerAdmin
  }