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
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM tableone;";

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
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
            return {
                Id: insertId,
                name: name,
                dateAdded: dateAdded,
            };
        }catch(error){
            console.log(error);
        }
    }

    //delete function
    async deleteRowById(id) {
        
        try{
            id = parseInt(id, 10);//here 10 is base 10
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM tableone WHERE Id = ?";

                connection.query(query, [id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        }catch(error){
            console.log(error);
            return false;
        }
    }


    //update function
    async updateNameById(id, name) {
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE tableone SET name = ? WHERE Id = ?";

                connection.query(query, [name, id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        }catch(error){
            console.log(error);
            return false;
        }
    }


    //search
    async searchByName(name) {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM tableone WHERE name = ? ;";

                connection.query(query, [name], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = DbService;