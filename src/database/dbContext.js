const { sql, poolPromise } = require('./connect');

async function runQuery(query, params) {
    const result = await poolPromise.then(pool => {
        var queryStatement = pool.request();
        params.forEach(p => {
            queryStatement.input(p.pName, p.pType, p.pValue)
        });
            return queryStatement.query(query);
        })
        // .then(r=>data.push(r['recordset']))
        .catch()
        .finally()

    return result['recordset'];
  }

module.exports = {
    runQuery: runQuery
};