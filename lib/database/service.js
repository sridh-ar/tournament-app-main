require("dotenv").config();
const mysql = require("mysql2/promise");

async function query(query) {
  let connection;
  let rows;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    [rows] = await connection.execute(query);
  } catch (err) {
    console.log(`Error in DB function(Query) >>> ${err.message}`);
  } finally {
    connection.end();
    return rows;
  }
}

module.exports = { query };
