const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host        :'localhost',
        user        :'root',
        password    :'MySQL',
        database    :'apiBooks',
        waitForConnections  :true,
        connectionLimit     :10,
        maxIdle     :10,
        idleTimeout :60000,
        queueLimit  :0
    }).promise();



    console.log('Created the connection to the database');

    module.exports = { pool };