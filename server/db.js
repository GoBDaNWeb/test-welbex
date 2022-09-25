const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "welbex",
  password: "Dfhufcvfrttdrf20",
  port: 5432,
});

module.exports = pool;
