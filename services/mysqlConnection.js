var mysql = require('mysql');

module.exports = {

    mysqlConn: (db) => {

        return new Promise ((resolve, reject) => {
            var con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: db
            });
            con.connect(function(err) {
            if 
                (err) reject(err);
            else 
                resolve(con);
            });
        });
    },

    query: (connection, sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) 
                    reject(err);
                else 
                    resolve(result);
              });

        });
    }
}