import { Grid } from "@mui/material";
import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Todos } from "./components/Todos";

function App() {
  return (
    <>
      <h2>Work list</h2>
      <Grid container alignItems="center" direction="column">
        <Grid item xs={10} width="50%">
          <AddTodo />
        </Grid>
        <Grid item width="50%">
          <Todos />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
