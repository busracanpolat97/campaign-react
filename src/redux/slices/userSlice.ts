import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  login: boolean;
}

const initialState: IUser = {
  login: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export const { logoutUser, setUser } =
  userSlice.actions;

export default userSlice.reducer;
