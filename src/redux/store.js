import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks/taskSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;
