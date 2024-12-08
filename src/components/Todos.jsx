import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  toggleComplete,
} from "../redux/features/todo/todoSlice";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { TextField, Button, Grid, IconButton, Tooltip } from "@mui/material";

export const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(null);
  const [input, setInput] = useState("");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [draggedTodo, setDraggedTodo] = useState(null);

  const handleUpdate = (todo) => {
    setIsUpdating(todo.id);
    setInput(todo.text);
  };

  const handleSaveUpdate = (id) => {
    if (input) {
      dispatch(updateTodo({ id, text: input }));
      setIsUpdating(null);
      setInput("");
    }
  };

  // Handle drag start
  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (e, targetTodo) => {
    e.preventDefault();
    if (draggedTodo && draggedTodo.id !== targetTodo.id) {
      const newTodos = [...todos];
      const draggedIndex = newTodos.findIndex((t) => t.id === draggedTodo.id);
      const targetIndex = newTodos.findIndex((t) => t.id === targetTodo.id);

      // Reorder todos
      const [removedTodo] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, removedTodo);

      // Update the state
      dispatch({ type: "todo/reorderTodos", payload: newTodos });
    }
    setDraggedTodo(null);
  };

  return (
    <>
      <h2>Tasks</h2>
      {todos?.length > 0 ? (
        <>
          {todos?.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, todo)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, todo)}
              style={{
                border:
                  draggedTodo?.id === todo.id ? "2px dashed #3f51b5" : "none",
                borderRadius: "4px",
                margin: "8px 0",
                padding: "8px",
              }}
            >
              {isUpdating === todo.id ? (
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  columnGap={2}
                  marginBlock="6px"
                >
                  <Grid item flex="1">
                    <TextField
                      variant="outlined"
                      inputProps={{ style: { height: "12px" } }}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item columnGap={2} display="flex" alignItems="center">
                    <Grid item>
                      <Button
                        className="edit_buttons"
                        onClick={() => handleSaveUpdate(todo.id)}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        className="edit_buttons"
                        onClick={() => setIsUpdating(null)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DragIndicatorIcon
                    fontSize="large"
                    style={{ cursor: "grab" }}
                  />
                  <Grid container className="task_card" alignItems="center">
                    <Grid
                      item
                      // xs={8}
                      justifyContent="flex-start"
                      display="flex"
                      flex="1"
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "6px",
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                          color: todo.completed ? "gray" : "inherit",
                        }}
                      >
                        <RadioButtonCheckedIcon />
                        {todo.text}
                      </span>
                    </Grid>
                    <Grid item xs={1}>
                      <Tooltip title="Edit" placement="top" arrow>
                        <IconButton
                          onMouseEnter={() => setHoveredIcon(`edit-${todo.id}`)}
                          onMouseLeave={() => setHoveredIcon(null)}
                          onClick={() => handleUpdate(todo)}
                        >
                          {hoveredIcon === `edit-${todo.id}` ? (
                            <EditIcon />
                          ) : (
                            <EditOutlinedIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Tooltip title="Done" placement="top" arrow>
                        <IconButton
                          onMouseEnter={() => setHoveredIcon(`done-${todo.id}`)}
                          onMouseLeave={() => setHoveredIcon(null)}
                          onClick={() =>
                            dispatch(toggleComplete({ id: todo.id }))
                          }
                        >
                          {hoveredIcon === `done-${todo.id}` ? (
                            <DoneIcon />
                          ) : (
                            <DoneOutlineRoundedIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                      <Tooltip title="Delete" placement="top" arrow>
                        <IconButton
                          onMouseEnter={() =>
                            setHoveredIcon(`delete-${todo.id}`)
                          }
                          onMouseLeave={() => setHoveredIcon(null)}
                          onClick={() => dispatch(deleteTodo({ id: todo.id }))}
                        >
                          {hoveredIcon === `delete-${todo.id}` ? (
                            <DeleteIcon />
                          ) : (
                            <DeleteOutlineOutlinedIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 style={{ color: "red" }}>No tasks found</h3>
        </>
      )}
    </>
  );
};
