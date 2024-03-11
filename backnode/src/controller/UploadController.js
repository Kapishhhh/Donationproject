import Upload from "../model/Upload.js";

class UploadController{

    
    async insert(req,res){
        try{
                let imageName="";
                if(req.file){
                    imageName= req.file.filename;
                }
                // const user = new Upload({...req.body});  
                const user =new Upload({...req.body,image:imageName});  
                console.log(user) 
                await user.save();
                return res.status(201).json(user);
            }
            catch(err){
                 return res.status(500).json(err);
            }
    }

    async content(req,res){
        try{
             const user =  await Upload.find({});
             return res.status(201).json(user)
        }catch(err){
              return res.status(500).json(err)
        } 
    }

}

export default  UploadController;
