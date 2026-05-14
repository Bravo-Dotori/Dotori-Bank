const { createPool } = require("mysql2/promise");

const pool = createPool({ 
  host: "localhost",
  user: "testuser",
  password: "1234",
  database: "testdb",
  waitForConnections: true, 
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;