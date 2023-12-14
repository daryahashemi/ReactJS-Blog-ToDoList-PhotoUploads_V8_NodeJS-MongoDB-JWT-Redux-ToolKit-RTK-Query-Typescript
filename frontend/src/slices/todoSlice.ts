import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Todos {
  _id: string;
  task: string;
  timeinterval: string;
}

export interface TodosState {
  todos: Todos[],
}

const initialState: TodosState = {
    todos: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    allTasks: (state, action:PayloadAction<Todos[]> ) => {
      state.todos = action.payload
    },
    newTask: (state, action:PayloadAction<Todos>) => {
      state.todos.unshift(action.payload)
    },
    deleteTask: (state, action:PayloadAction<string>) => {
       state.todos.splice(state.todos.findIndex(w => w._id === action.payload), 1)
    },
  },
})

export const { allTasks, newTask, deleteTask } = todoSlice.actions

export default todoSlice.reducer
