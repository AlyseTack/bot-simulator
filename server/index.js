// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
// create application/json parser
var jsonParser = bodyParser.json()
const cors = require('cors');

const taskList = require('./data/task_data.json');
const process_task = require('./process_task');

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/taskList", (req, res) => {
  console.log("Get /taskList");
    res.json({ taskList: taskList });
  });

app.post("/startTask", jsonParser, async (req, res) => {
  const {desc, dur, id, name} = req.body;
  console.log(`Start ${id} - ${desc}`);
  const result = await process_task.processTask(desc, dur);
  console.log(`End ${id} - ${desc}`);
  res.json({description: result, id: id, botName: name});
});