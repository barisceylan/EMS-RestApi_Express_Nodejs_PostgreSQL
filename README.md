# Employee Management System

EMS is a Rest Api Express project which was written with Node.js and used PostgreSQL in order to control the database. EMS allows user to control company's employees, departments, locations and employee titles via get(), post(), put() and delete() features.

## Side Programs

- Uses [postman](https://www.postman.com/) to test api.
- Uses [nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the node application when file changes.
- Uses [express](https://www.npmjs.com/package/express) as web framework for Node.js.
- Uses [pool](https://node-postgres.com/api/pool) to connect Node.js to PostgreSQL.

```bash
npm i nodemon     // install nodemon
npm i express pg  // install express and postgreSQL
npm i pool        // install pool

```
## PostgreSQL Usage

```bash
psql -U postgres  // open database in command line.
\l                // list existing databases.
\c ems_database   // choose database.
\dt               // list existing tables

```
## Pool Usage

```python
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  database: "ems_database",
  host: "localhost",
  port: "5432",
});
```





### Created by Barış Ceylan
