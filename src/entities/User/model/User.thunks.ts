import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  editUserInfo,
  getUserInfo,
  login,
  register,
} from "../api/User.api";
import { isAxiosError } from "axios";
import {
  IChangePasswordValues,
  ILoginFormValues,
  IRegisterRequest,
  IUserRequest,
} from "./types";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async function (data: ILoginFormValues, { rejectWithValue }) {
    try {
      const response = await login(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const regUser = createAsyncThunk(
  "user/regUser",
  async function (data: IRegisterRequest, { rejectWithValue }) {
    try {
      const response = await register(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async function (_, { rejectWithValue }) {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async function (data: IUserRequest, { rejectWithValue }) {
    try {
      const response = await editUserInfo(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async function (data: IChangePasswordValues, { rejectWithValue }) {
    try {
      const response = await changePasswordApi(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
