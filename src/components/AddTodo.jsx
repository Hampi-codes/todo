import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/features/todo/todoSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, TextField, Grid } from "@mui/material";

export const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input !== "") {
      dispatch(addTodo({ text: input }));
      setInput("");
    }
  };

  return (
    <>
      <form
        onSubmit={addTodoHandler}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid itme xs={6} display="flex">
          <TextField
            type="text"
            variant="outlined"
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
          />
          <IconButton type="submit">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
      </form>
    </>
  );
};
