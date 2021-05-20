const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});

connection.connect((error) => {
    if(error){
        console.log(err.message)
    }
    else{
        console.log('DB STATUS : ' + connection.state);
    }
})


class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async insertOrder(props){
        props.forEach(async(prop) => {
            const {username, size, type, num_milk, num_cream, num_sugar} = prop;
            const dateAdded = new Date();
            console.log(dateAdded);
            try{
                const insertId = await new Promise((resolve, reject) => {
                    const query = "INSERT INTO orders  (username. size, type, num_milk, num_cream, num_sugar, order_date) VALUES (?, ?, ?, ?, ?, ?, ?);";
                    connection.query(query, [username, size, type, num_milk, num_cream, num_sugar, dateAdded], (error, result) => {
                        if(error){
                            reject(new Error(error.message));
                        }
                        else{
                            resolve(result.insertId);
                        }
                    })
                })
                return insertId;
            }
            catch(error){
                console.log(error.message);
            }
        });
    }
    
    async singleOrder(props){
        const {username, size, type, num_milk, num_cream, num_sugar} = props;
        console.log(size);
        const dateAdded = new Date();
        console.log(dateAdded);
        try{
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO orders  (username, size, type, num_milk, num_cream, num_sugar, order_date) VALUES (?, ?, ?, ?, ?, ?, ?);";
                connection.query(query, [username, size, type, num_milk, num_cream, num_sugar, dateAdded], (error, result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    else{
                        resolve(result.insertId);
                    }
                })
            })
            return insertId;
        }
        catch(error){
            console.log(error.message);
        }

    }

    async getOrderHistory(props){
        const {username} = props;
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM orders WHERE username LIKE ?;"
                connection.query(query, [username], (error, result) => {
                    if(error){
                        reject(error);
                    }
                    else{
                        resolve(result);
                    }
                })
            })
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async verifyCredentials(props){
        const {username} = props;
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username LIKE ?;"
                connection.query(query, [username], (error, result) => {
                    if(error){
                        reject(new Error(error.message));
                    }
                    else{
                        resolve(result)
                    }
                })
            });
            console.log(response);
            return response;
        
        }
        catch(error){
            console.log(error);
            // res.status(409).send(error);
        }
    }

    async createAccount(props){
        const {username, password} = props;
        const date_created = new Date();
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (username, password, date_created) VALUES (?, ?, ?);"
                connection.query(query, [username, password, date_created], (error, result) => {
                    if(error){
                        reject(console.log(error));
                    }
                    else{
                        resolve(result);
                    }
                })
            })
        }
        catch(error){
            console.log(error);
        }
    }


}


module.exports = DbService;