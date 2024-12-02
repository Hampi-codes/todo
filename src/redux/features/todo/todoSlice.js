import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "Add more tasks", completed: false }],
  };
  
  export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
      addTodo: (state, action) => {
        state.todos.push({
          id: nanoid(),
          text: action.payload.text,
          completed: false,
        });
      },
      deleteTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      },
      updateTodo: (state, action) => {
        const updatedTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (updatedTodo) {
          updatedTodo.text = action.payload.text;
        }
      },
      toggleComplete: (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
    },
  });
  
  export const { addTodo, deleteTodo, updateTodo, toggleComplete } =
    todoSlice.actions;
  
  export default todoSlice.reducer;
   