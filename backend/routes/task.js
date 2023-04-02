const express = require("express");
const router = express.Router();
const { task } = require("../controllers");
router.post("/saveTask", task.createTask);
router.get("/getTask", task.getTasks);
router.get("/makeComplete", task.completeTask);
router.get("/delete", task.deleteTask);

module.exports = router;
