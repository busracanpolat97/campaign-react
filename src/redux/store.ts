import { configureStore } from '@reduxjs/toolkit';
// import optionReducer from './slices/apiSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    // options: optionReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
