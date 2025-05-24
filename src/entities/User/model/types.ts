import { TRole, TStatus } from "@/shared/model";
import { JwtPayload } from "jwt-decode";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  phone_number: string;
}

export type IUserRequest = Omit<IRegisterRequest, "password">;

export interface IUser {
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  phone_number: string;
  role: TRole;
  id: number;
}

export interface IUserState {
  userInfo: {
    email: string | null;
    last_name: string | null;
    first_name: string | null;
    middle_name: string | null;
    phone_number: string | null;
    role: TRole | null;
    id: number | null;
  };
  status: TStatus;
}

export interface IChangePasswordValues {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface IAuthToken extends JwtPayload {
  role: TRole;
  user_id: number;
}
