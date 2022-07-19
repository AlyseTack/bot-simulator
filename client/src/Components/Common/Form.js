import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';

const defaultValues = {
  botName: "",
  task1: "",
  task2: ""
};

const Form = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);
  console.log(props)
  const {taskList, submit} = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    submit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="section-title" >Choose a name and some tasks for your new bot</div>
      <Grid container alignItems="center" justifyContent="center" direction="column" spacing={2}>
        <Grid item minWidth={230}>
          <TextField
            name="botName"
            label="What's your bot's name?"
            type="text"
            variant="outlined"
            value={formValues.botName}
            onChange={handleInputChange}
            fullWidth
			required
          />
        </Grid>
        <Grid item>
            <div className="form-instructions">Leave these blank if you want a surprise task!</div>
            <Grid item minWidth={120}>
                <FormControl fullWidth sx={{mt: 1}}>
                    <InputLabel id="task-1-label">Task 1</InputLabel>
                    <Select
                        labelId="task-1-label"
                        name="task1"
                        label="Task 1"
                        value={formValues.task1}
                        onChange={handleInputChange}
                    >
                        {taskList.map((task, index) =>
                            <MenuItem key={index} value={index}>{task.description}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item minWidth={120}>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel id="task-2-label">Task 2</InputLabel>
                    <Select
                        labelId="task-2-label"
                        name="task2"
                        label="Task 2"
                        value={formValues.task2}
                        onChange={handleInputChange}
                    >
                        {taskList.map((task, index) =>
                            <MenuItem key={index} value={index}>{task.description}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Button sx={{mt: 2}} variant="contained" color="primary" type="submit">
          Create My Bot!
        </Button>
      </Grid>
    </form>
  );
};

export default Form;