
const Admin = require("../../../models/admin-user.model");
const jwt = require("jsonwebtoken");

const AdminServiceGuard = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
        return  res.status(401).json({message:"Unauthorised,Please Login"})
       }    
       const spliedToken = token.split(" ")[1]
        const verified = jwt.verify(spliedToken, process.env.JWT_SECRET);
        const user = await Admin.findOne({ID: verified.id});
        if (!user) {
          return res.status(400).json({message:"No Users Found"})
        }
        // req.token = token;
        // req.user = user;
        next();
   
  } catch (error) {
    console.log(error)
    return res.status(401).json({message:"Not Authorised,Please try again with Valid credentials"})
    
  }
};

module.exports = AdminServiceGuard;
