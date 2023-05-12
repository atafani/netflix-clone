import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authSlice, { setUser } from "./auth/authSlice";
import { LOCALSTORAGE_SESSION_ID } from "utils/constants";
import { ResponseDTO, UserDTO } from "dtos";
import { api } from "config";

const getStore = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  api.get(`/api/user`).then((res: ResponseDTO<UserDTO>) => {
    if (res?.data) {
      store.dispatch(setUser(res.data));
    }
  });

  return store;
};
const store = getStore();
export default store;
export type RootState = ReturnType<typeof store.getState>;

// Create a custom AppDispatch type
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
