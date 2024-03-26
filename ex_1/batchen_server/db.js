var mysql = require("mysql2/promise");


async function query(sql, params) {
    var con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234.com",
        database: "my_db"
    });
    var [result] = await con.execute(sql, params);
    con.end();
    return result;
}

module.exports = query;