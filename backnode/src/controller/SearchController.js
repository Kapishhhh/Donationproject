import Handler from "../logger/ResponseHandler.js"
import Search from "../model/search.js";
const responseInstance = new Handler();

class SearchController {

    async postSearch(req,res){
        try{
          console.log("search post route")
        //   const search = req.body;
        let userId = req.user.userId
        console.log(userId);
        const user = new Search({...req.body,userID: userId});
        console.log(user,'search value');
        await user.save();
          
        }
        catch(err){
           console.log(err,'error in inserting search data')
        }
    }

    async getSearch(req,res){
        try{
            console.log("search post route")
        }
        catch(err){
           console.log(err,'error in fetching data')
        }
    }

    async deleteSearch(req,res){
        try{

        }
        catch(err){
           console.log(err,'error in deleting data')
        }
    }

}

export default SearchController;