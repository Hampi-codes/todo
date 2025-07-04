import { Grid } from "@mui/material";
import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Todos } from "./components/Todos";

function App() {
  return (
    <>
      <h2>Work list</h2>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} lg={8} xl={7}>
          <AddTodo />
        </Grid>
        <Grid item xs={12} sm={10} lg={8} xl={7}>
          <Todos />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
