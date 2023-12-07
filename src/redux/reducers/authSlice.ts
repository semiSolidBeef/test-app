import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  login: string;
  password: string;
  token: string;
}

interface IAuth {
  user: IUser | undefined;
  isAuth: boolean;
}

const initialState: IAuth = {
  user: undefined,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setIsAuth } = authSlice.actions;
export default authSlice.reducer;
