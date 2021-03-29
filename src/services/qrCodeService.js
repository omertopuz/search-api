const sql = require('mssql')  
const db = require('../database/dbContext');
require('dotenv/config');

const getQrCode = async (requestModel)=>{
    let params = [];
    let queryStatement = process.env.SQL_QrCodes;
    let columns = JSON.parse(process.env.SQL_QrCodes_Columns);

    if(requestModel.qrCodeTypeId){
        params.push({
            pName: columns[0],
            pType: sql.Int,
            pValue: requestModel.qrCodeTypeId,
        });
        queryStatement += ` AND qn.${columns[0]} = @${columns[0]} `;
    }

    let qrCodeId = isNaN(requestModel.searchParam) ? parseInt(requestModel.searchParam,36) 
                : requestModel.searchParam
    queryStatement += ` AND ( qn.${columns[1]} = @${columns[1]} OR qn.${columns[2]} = @${columns[2]} ) `;
        params.push({
            pName: columns[1],
            pType: sql.Int,
            pValue: qrCodeId
        })
        params.push({
            pName: columns[2],
            pType: sql.Int,
            pValue: requestModel.searchParam
        });


    let result = await db.runQuery(queryStatement,params);
    return result;
}



module.exports = {
    getQrCode
};