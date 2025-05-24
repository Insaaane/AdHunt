export {
  default as userReducer,
  getUserInfo,
  getUserRequestStatus,
} from "./model/User.slice";
export {
  changePassword,
  editUser,
  getUser,
  loginUser,
  regUser,
} from "./model/User.thunks";
export type { IUser } from "./model/types";
