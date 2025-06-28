import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

const loadInitialState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  return {
    user: {
      currentUser: token && user ? { 
        ...JSON.parse(user),
        token 
      } : null,
      loading: false,
      error: null
    }
  };
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadInitialState()
});