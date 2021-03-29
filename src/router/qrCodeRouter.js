
// const conn = require('../database/connect');
const express = require('express'); 
const qrCodeService = require('../services/qrCodeService');
const qrCodeRouter = express.Router();

qrCodeRouter.get('/', async (req,res)=>{
    let qrCodeModel = {
        searchParam: req.query.searchParam,
        qrCodeTypeId: req.query.qrCodeTypeId
    };
    
    let result = await qrCodeService.getQrCode(qrCodeModel);
    res.send(result);
});

module.exports = qrCodeRouter

