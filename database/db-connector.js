// ./database/db-connector.js

// .env contains project secretes so passwords aren't commited to a public repository
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


// Get an instance of mysql we can use in the app
let mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
let pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_DATABASE
})

// Export it for use in our applicaiton
module.exports.pool = pool;