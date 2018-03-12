import mysql from 'mysql';


var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          console.log("Connnection error.")
        } else{
          connection.query(sql, function (err,rows) {
              callback(err,rows);
              connection.release();
          });
        };
    });
}

exports.query = query;
