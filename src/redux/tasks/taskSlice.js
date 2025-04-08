import { createSlice } from '@reduxjs/toolkit';

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { taskList: savedTasks },
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.taskList));
    },
    deleteTask: (state, action) => {
      state.taskList.splice(action.payload, 1);
      localStorage.setItem('tasks', JSON.stringify(state.taskList));
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
