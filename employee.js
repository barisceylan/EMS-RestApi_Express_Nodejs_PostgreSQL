const express = require("express");
const app = new express();

const pool = require("./databaseHandler");

app.use(express.json());

//get all employees
app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employee");

    var total = 0;
    for (var i = 0; i < allEmployees.rows.length; i++) {
      total += allEmployees.rows[i].salary;
    }
    averageSalary = total / allEmployees.rows.length;

    allEmployees.rows[allEmployees.rows.length] =
      "Average of salaries is " + averageSalary;

    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an employee
app.get("/employees/:emp_id", async (req, res) => {
  try {
    const { emp_id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employee WHERE emp_id = $1",
      [emp_id]
    );
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create employee
app.post("/employees", async (req, res) => {
  try {
    const { name } = req.body;
    const { surname } = req.body;
    const { e_mail } = req.body;
    const { phone } = req.body;
    const { start_date } = req.body;
    const { salary } = req.body;
    const { department } = req.body;
    const { title } = req.body;
    const { manager } = req.body;

    const newEmployee = await pool.query(
      "INSERT INTO employee (name, surname, e_mail, phone, start_date,salary, department, title, manager) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9)",
      [
        name,
        surname,
        e_mail,
        phone,
        start_date,
        salary,
        department,
        title,
        manager,
      ]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update employee
app.put("/employees/:emp_id", async (req, res) => {
  try {
    const { emp_id } = req.params;
    const { name } = req.body;
    const { surname } = req.body;
    const { e_mail } = req.body;
    const { phone } = req.body;
    const { start_date } = req.body;
    const { salary } = req.body;
    const { department } = req.body;
    const { title } = req.body;
    const { manager } = req.body;

    const updateEmployee = await pool.query(
      "UPDATE employee SET name = $1, surname=$2, e_mail = $3, phone=$4, start_date=$5, salary =$6, department = $7, title =$8, manager =$9 WHERE emp_id = $10",
      [
        name,
        surname,
        e_mail,
        phone,
        start_date,
        salary,
        department,
        title,
        manager,
        emp_id,
      ]
    );
    res.json("Employee is updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete employee
app.delete("/employees/:emp_id", async (req, res) => {
  try {
    const { emp_id } = req.params;

    const deleteEmployee = await pool.query(
      "DELETE FROM employee WHERE emp_id = $1",
      [emp_id]
    );
    res.json("Employee deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
