import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authServices";
import { CookieValueTypes, getCookie } from "cookies-next";
import { eAuthStatus } from "enums";
import { LoginDTO, UserDTO } from "dtos";

export interface StateProps {
  user: UserDTO | null;
  status: eAuthStatus;
  message: string | unknown;
}

const user: CookieValueTypes = getCookie("user");

// initalize state
const initalState: StateProps = {
  user: user ? JSON.parse(user!.toString()) : null,
  status: eAuthStatus.Initial,
  message: "",
};

// authslice
const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    reset: (state) => {
      state.status = eAuthStatus.Initial;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.status = eAuthStatus.Loading;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = eAuthStatus.Success;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = eAuthStatus.Error;
      state.message = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.status = eAuthStatus.Loading;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = eAuthStatus.Success;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = eAuthStatus.Error;
      state.message = action.payload;
    });
  },
});

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserDTO, thunkAPI) => {
    try {
      const res = await authService.register({
        email: user.email,
        password: user.password || "",
      });
      return res;
    } catch (error: any) {
      console.log("register error", error);
      if (error.message) {
        const message: string = error.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginDTO, thunkAPI) => {
    try {
      const data = await authService.login({
        email: user.email,
        password: user.password || "",
      });
      return data;
    } catch (error: any) {
      // console.log(error);
      if (error.status) {
        const message: string = error.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong");
      }
    }
  }
);

export const { reset } = authSlice.actions;
export default authSlice.reducer;
