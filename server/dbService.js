const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db' + ' ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    //get data function
    async getAllData() {
        try{
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM tableone;";

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(res);
            return res;
        }catch(error){
            console.log(error);
        }
    }

    //insert function
    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tableone (name, date_added) VALUES (?, ?);";

                connection.query(query, [name, dateAdded], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId);
            return insertId;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = DbService;