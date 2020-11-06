const express = require("express");
const app = new express();

const pool = require("./databaseHandler");

app.use(express.json());

//get all titles
app.get("/titles", async (req, res) => {
  try {
    const allTitles = await pool.query("SELECT * FROM title");
    res.json(allTitles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a title
app.get("/titles/:title_id", async (req, res) => {
  const { title_id } = req.params;
  try {
    const title = await pool.query("SELECT * FROM title WHERE title_id = $1", [
      title_id,
    ]);
    res.json(title.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create title
app.post("/titles", async (req, res) => {
  try {
    const { start_date } = req.body;
    const { end_date } = req.body;
    const { title } = req.body;
    const { department } = req.body;

    const newTitle = await pool.query(
      "INSERT INTO title (start_date, end_date, title, department) VALUES ($1, $2,$3, $4)",
      [start_date, end_date, title, department]
    );
    res.json(newTitle.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update title
app.put("/titles/:title_id", async (req, res) => {
  try {
    const { start_date } = req.body;
    const { end_date } = req.body;
    const { title } = req.body;
    const { department } = req.body;

    const updateTitle = await pool.query(
      "UPDATE title SET start_date = $1, end_date=$2, title = $3, department = $4 WHERE title_id = $5",
      [start_date, end_date, title, department, title_id]
    );
    res.json("Title is updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete title
app.delete("/titles/:title_id", async (req, res) => {
  try {
    const { title_id } = req.params;
    const deleteTitle = await pool.query(
      "DELETE FROM title WHERE title_id = $1",
      [title_id]
    );
    res.json("Title deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
