import { Roles } from "../config";

export type TStatus = {
  isLoading: boolean;
  error: string | null;
};

export type TRole = `${Roles}`;
