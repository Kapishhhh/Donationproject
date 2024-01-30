import User from "../model/User.js";



class UserController{

    async index(req,res){
           const data= await User.find({});
            return res.status(200).json(data);
        }
    
    async store(req,res){
        try{
                let imageName="";
                if(req.file){
                    imageName = req.file.filename;
                }
                const user = new User({...req.body,image:imageName});      
                const data= await user.save();
                console.log(hashedPassword);
            return res.status(201).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

export default UserController;