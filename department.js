const express = require("express");
const app = new express();

const pool = require("./databaseHandler");

app.use(express.json());

//get all departments
app.get("/departments", async (req, res) => {
  try {
    const allDepartments = await pool.query("SELECT * FROM department");
    res.json(allDepartments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a department
app.get("/departments/:dep_id", async (req, res) => {
  const { dep_id } = req.params;
  try {
    const department = await pool.query(
      "SELECT * FROM department WHERE dep_id = $1",
      [dep_id]
    );
    res.json(department.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create department
app.post("/departments", async (req, res) => {
  try {
    const { department } = req.body;
    const { manager } = req.body;
    const { location } = req.body;

    const newDepartment = await pool.query(
      "INSERT INTO department (department, manager, location) VALUES ($1, $2,$3)",
      [department, manager, location]
    );
    res.json(newDepartment.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update department
app.put("/departments/:dep_id", async (req, res) => {
  try {
    const { dep_id } = req.params;
    const { department } = req.body;
    const { manager } = req.body;
    const { location } = req.body;

    const updateDepartment = await pool.query(
      "UPDATE department SET department = $1, manager=$2, location = $3 WHERE dep_id = $4",
      [department, manager, location, dep_id]
    );
    res.json("Department is updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete department
app.delete("/departments/:dep_id", async (req, res) => {
  try {
    const { dep_id } = req.params;
    const deleteDepartment = await pool.query(
      "DELETE FROM department WHERE dep_id = $1",
      [dep_id]
    );
    res.json("Department deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
