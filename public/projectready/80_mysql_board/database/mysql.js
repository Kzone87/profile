const mysql = require('mysql2/promise');


const dbcon = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,  // 커넥션 객체의 보유개수
    debug: false,  // 디버그 로그메세지 출력안함
});

module.exports = dbcon;