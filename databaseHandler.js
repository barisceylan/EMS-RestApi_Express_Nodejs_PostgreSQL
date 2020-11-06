const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "m400k11",
  database: "ems_database",
  host: "localhost",
  port: "5432",
});

module.exports = pool;
