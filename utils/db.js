const mysql = require("mysql");
const config = require("../config");

const { host, port, database, user, password } = config.mysql;

const pool = mysql.createPool({
  host: host,
  port: port || 3306,
  database,
  user,
  password,
});

function query(sql, cb) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      cb(err, rows);
      connection.release();
    });
  });
}

exports.query = query;
