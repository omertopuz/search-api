const sql = require('mssql')  
require('dotenv/config');

var config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST, 
    database: process.env.DB_DBNAME ,
};

const poolPromise = new sql.ConnectionPool(config)  
    .connect()  
    .then(pool => {  
    console.log('Connected to MSSQL')  
    return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  

module.exports = {  
    sql, poolPromise  
}  