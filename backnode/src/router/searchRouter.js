import express from 'express'
import SearchController from "../controller/SearchController.js"

const searchRouter = express.Router();

const searchInstance = new SearchController();

searchRouter.post("/",searchInstance.postSearch);
searchRouter.get("/",searchInstance.getSearch);
searchRouter.delete("/",searchInstance.deleteSearch);


export default searchRouter
