import { Grid } from "@mui/material";
import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Todos } from "./components/Todos";

function App() {
  return (
    <>
      <h2>Work list</h2>
      <Grid container alignItems="center" direction="column">
        <Grid item width="70%">
          <AddTodo />
        </Grid>
        <Grid item width="70%">
          <Todos />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
