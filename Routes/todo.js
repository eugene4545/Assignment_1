const express = require("express");
const router = express.Router();
const Todo = require("../Models/todoMod");

//Creating a new task
router.post("/tasks", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Read a single task
router.get("/tasks/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
        return res.status(404).send({message: 'Task not found'})
    }
    res.send({message: 'Task updated Successfully',todo});
  } catch (error) {
    res.status(400).send({message:'Failed to update task',error});
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send({message: 'Task successfully deleted', id: req.params.id})
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
