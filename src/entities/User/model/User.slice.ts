import { createSlice } from "@reduxjs/toolkit";
import { getUser, loginUser, regUser } from "./User.thunks";
import { IUserState } from "./types";
import { getInfoFromToken } from "../lib/getInfoFromToken";

const initialState: IUserState = {
  userInfo: {
    email: null,
    last_name: null,
    first_name: null,
    middle_name: null,
    phone_number: null,
    role: getInfoFromToken("role"),
    id: getInfoFromToken("user_id"),
  },
  status: {
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status.isLoading = false;
        localStorage.setItem("token", action.payload.access);
        state.userInfo.role = getInfoFromToken("role");
        state.userInfo.id = getInfoFromToken("user_id");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.payload as string;
      })

      // REGISTER
      .addCase(regUser.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.status.isLoading = false;
        localStorage.setItem("token", action.payload.access);
        state.userInfo.role = getInfoFromToken("role");
      })
      .addCase(regUser.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.payload as string;
      })

      // GET USER INFO
      .addCase(getUser.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.payload as string;
      });
  },
  selectors: {
    getUserRequestStatus: (state) => state.status,
    getUserInfo: (state) => state.userInfo,
  },
});

export default userSlice.reducer;
export const { getUserRequestStatus, getUserInfo } = userSlice.selectors;
