import React, { useRef } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Form from "../Common/Form";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

let taskCount = 0;
let completedIndex = [];

function App() {
  const [taskList, setTaskList] = React.useState([]);
  const [botTasks, setBotTasks] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState([]);
  const botName = useRef("");

  React.useEffect(() => {
    async function fetchTaskList() {
      try {
        let res = await fetch("/taskList");
        const data = await res.json();
        console.log("Task List: ");
        console.log(data.taskList);
        setTaskList(data.taskList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTaskList();
  }, []);

  const startTask = async (d) => {
    const taskData = {
      desc: d.description,
      dur: d.duration,
      id: taskCount,
      name: botName.current,
    };

    // Populate the historical list of tasks
    const newTask = {
      botName: botName.current,
      desc: d.description,
      complete: false,
      id: taskCount,
    };
    let temp = botTasks;
    temp.push(newTask);
    setBotTasks([...temp]);

    console.log(botTasks);

    // Increment the task count for the next run
    taskCount++;

    try {
      const res = await fetch("/startTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const task = await res.json();
      if (res.status === 200) {
        // Update the completed tasks
        completedIndex.push(task.id);
		console.log("Completed Task Index");
		console.log(completedIndex);

        const doneTask = {
          botName: task.botName,
          desc: task.description,
          complete: true,
          id: task.id,
        };
        // completedTasks.current = [...temp2];
        setCompletedTasks((arr) => [...arr, doneTask]);
        console.log("completedTasks");
        console.log(completedTasks);
      }
    } catch (err) {
      console.error();
    }
  };

  // Testing code
//   const randomTasks = () => {
//     if (taskList && taskList.length) {
//       const task1 = generateRandomTask(taskList.length);
//       const task2 = generateRandomTask(taskList.length);

//       startTask(taskList[task1]);
//       startTask(taskList[task2]);
//     }
//   };

  const generateRandomTask = (i) => {
    return Math.floor(Math.random() * i);
  };

  const handleSubmit = (d) => {
    botName.current = d.botName;
    if (d.task1 !== "") {
      startTask(taskList[d.task1]);
    } else {
      const task1 = generateRandomTask(taskList.length);
      startTask(taskList[task1]);
    }
    if (d.task2 !== "") {
      startTask(taskList[d.task2]);
    } else {
      const task2 = generateRandomTask(taskList.length);
      startTask(taskList[task2]);
    }
  };

  return (
    <Container className="App">
      <div className="bot-app-header">Welcome to your bot creator!</div>
      <Grid
        className="main-container"
        container
        spacing={10}
        justifyContent="center"
      >
        <Grid item>
          {taskList.length && (
            <Form taskList={taskList} submit={handleSubmit}></Form>
          )}
        </Grid>
        <Grid item>
          <div className="section-title">List of current tasks</div>
          <List>
            {botTasks
              .filter((task) => completedIndex.indexOf(task.id) === -1)
              .map((task, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemIcon>
                    <TaskAltIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={task.botName + ": " + task.desc} />
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item>
          <div className="section-title">List of completed tasks</div>
          <List>
            {completedTasks.map((task, index) => (
              <ListItem disablePadding key={index}>
                <ListItemIcon>
                  <TaskAltIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={task.botName + ": " + task.desc} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
