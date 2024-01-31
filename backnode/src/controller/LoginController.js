import User from "../model/Userprofile.js";
// import TokenVerify from "../middleware/TokenVerify.js";
// import PasswordReset from "../models/PasswordReset.js";
// import Mail from "../lib/Mail.js";
import dotenv from "dotenv";

dotenv.config();


class LoginController{

    async login(req,res){
        const {email, password} = req.body;
        let user =await User.findOne({email: email});
        if(!user){
            return res.status(200).json({notfound: "User not found"});
        }
        
        let isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(200).json({incorrect: "Incorrect password"});
        }

        let token = user.generateToken();
        return res.status(200).json({token: token});

    }
}

export default LoginController;
