const sql = require('mssql')  
const db = require('../database/dbContext');
require('dotenv/config');

const searchUser = async (requestModel)=>{
    let params = [];
    let queryStatement = process.env.SQL_Users;
    let columns = JSON.parse(process.env.SQL_Users_Columns);

    if(isNaN(requestModel.searchParam)){    //search from name
        params.push({
            pName: columns[1],
            pType: sql.VarChar,
            pValue: `%${requestModel.searchParam}%` ,
        });
        queryStatement += ` AND vsu.${columns[1]} LIKE @${columns[1]} `;
    }else if(requestModel.columnName){
        params.push({
            pName: requestModel.columnName,
            pType: columns.slice.filter(a=>a===requestModel.columnName) ?  sql.Int:sql.VarChar,
            pValue: requestModel.searchParam ,
        });
        queryStatement += ` AND vsu.${requestModel.columnName} = @${requestModel.columnName} `;
    }
    else if(!isNaN(requestModel.searchParam) && requestModel.searchParam.length > 9){
        queryStatement += ` AND vsu.${columns[0]} = @${columns[0]} `;
        params.push({
                pName: columns[1],
                pType: sql.VarChar,
                pValue: requestModel.searchParam
            });
    }else{
        queryStatement += ` AND ( vsu.${columns[3]} = @${columns[3]} OR vsu.${columns[4]} = @${columns[4]} OR vsu.${columns[5]} = @${columns[5]} )`;
        params.push({
            pName: columns[3],
            pType: sql.Int,
            pValue: requestModel.searchParam
        })
        params.push({
            pName: columns[4],
            pType: sql.Int,
            pValue: requestModel.searchParam
        });
        params.push({
            pName: columns[5],
            pType: sql.Int,
            pValue: requestModel.searchParam
        });
    }

    if(requestModel.searchType){ 
        queryStatement += ` AND vsu.${columns[2]} = @${columns[2]} `;
        params.push({
            pName: columns[2],
            pType: sql.VarChar,
            pValue: requestModel.searchType
        });
    }

    // console.log('queryStatement:' + queryStatement);
    // params.forEach(f=>console.log(f.pName + ' - ' + f.pType +  ' - ' + f.pValue))
    let result = await db.runQuery(queryStatement,params);
    // console.log(result);
    return result;
}

module.exports = {
    searchUser
};