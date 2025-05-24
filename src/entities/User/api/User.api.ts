import { api } from "@/shared/api";
import {
  IChangePasswordValues,
  ILoginFormValues,
  ILoginResponse,
  IRegisterRequest,
  IUser,
  IUserRequest,
} from "../model/types";

export const login = async (data: ILoginFormValues) => {
  const response = await api.post<ILoginResponse>("/token/", data);
  return response.data;
};

export const register = async (data: IRegisterRequest) => {
  const response = await api.post<ILoginResponse>("/register/", data);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get<IUser>("/profile/");
  return response.data;
};

export const editUserInfo = async (data: IUserRequest) => {
  const response = await api.put<IUser>("/profile/", data);
  return response.data;
};

export const changePasswordApi = async (data: IChangePasswordValues) => {
  const response = await api.post("/profile/change-password/", data);
  return response.data;
};
