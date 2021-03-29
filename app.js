const express = require('express');
const cors = require('cors');
const baseRouter = require('./src/router/baseRouter');
require('dotenv/config');

const app = express();

//Middlewares
//app.use(auth);
app.use(cors());
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

//Import Routes
app.use('/api',baseRouter);
app.get('/qr',(req,res)=>{
    var enc = parseInt(req.query.s).toString(36).toUpperCase();
    var dec = parseInt(enc,36);
    res.send('req.query.s : ' + req.query.s + ' - > ' + enc + '<br/>enc - > ' + enc + ' - > '+ dec);
})

app.listen(process.env.API_PORT);