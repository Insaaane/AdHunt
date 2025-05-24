import { jwtDecode } from "jwt-decode";
import { IAuthToken } from "../model/types";

export const getInfoFromToken = <K extends keyof IAuthToken>(key: K) => {
  const token = localStorage.getItem("token") || "";
  if (token) {
    const decodedToken = jwtDecode<IAuthToken>(token);
    return decodedToken[key];
  }
  return null;
};
