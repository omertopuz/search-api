
// const conn = require('../database/connect');
const express = require('express'); 
const userService = require('../services/searchUserService');
const usersRouter = express.Router();

usersRouter.get('/', async (req,res)=>{
    let userModel = {
        searchParam: req.query.searchParam,
        searchType: req.query.searchType
    };
    
    let result = await userService.searchUser(userModel);
    res.send(result);
});

module.exports = usersRouter

