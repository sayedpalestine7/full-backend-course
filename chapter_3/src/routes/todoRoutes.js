import express from "express";
import db from "../db.js";

const router = express.Router();

//Get all todos for a user
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId); // Assuming req.userId is set after authentication
  res.json(todos);
});

// Create a new todo
router.post("/", (req, res) => {
  res.send("Create a new todo");
});

// Update a todo
router.put("/:id", (req, res) => {
  res.send("Update a todo");
});

// Delete a todo
router.delete("/:id", (req, res) => {
  res.send("Delete a todo");
});

export default router;
