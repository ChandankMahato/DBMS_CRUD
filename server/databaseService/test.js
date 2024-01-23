const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db' + ' ' + connection.state);
    const query1 =
        "CREATE TABLE if not exists customers (\
        name VARCHAR(50) NOT NULL,\
        number NUMERIC NOT NULL unique,\
        address VARCHAR(50) NOT NULL,\
        dateadded DATE NOT NULL,\
        favorite VARCHAR(100),\
        amount DECIMAL(10,2),\
        dues DECIMAL(10,2),\
        primary key(number)\
    )";
    connection.query(query1, function (err, result) {
        if (err) throw err;
    });
});

class Test {

    static getDbServiceInstance() {
        return instance ? instance : new Test();
    }

    //get data function
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM customers;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //insert function
    async insertNewName(Cname, Cnumber, Caddress, Cfavorite, Cdues) {
        try {
            const dateAdded = new Date();
            const amount = 200;
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO customers (name,number,address,dateadded, favorite,amount,dues) VALUES (?,?,?,?,?,?,?);";

                connection.query(query, [Cname,Cnumber,Caddress, dateAdded, Cfavorite, amount, Cdues], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                Id: insertId,
                name: Cname,
                dateAdded: dateAdded,
                number: Cnumber,
                address: Caddress,
                favorite: Cfavorite,
                dues: Cdues
            };
        } catch (error) {
            console.log(error);
        }
    }

    //delete function
    async deleteRowById(Id) {
        console.log(Id);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM customers WHERE number = ?";

                connection.query(query, [Id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    //update function
    async updateNameById(Cname, Cnumber, Caddress, Cfavorite, Cdues) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE customers SET name = ?, number = ?, address = ?, favorite = ?, dues = ? WHERE number = ?";

                connection.query(query, [Cname,Cnumber,Caddress,Cfavorite,Cdues, Cnumber], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //search
    async searchByName(number) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM customers WHERE number = ? ;";

                connection.query(query, [number], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Test;
