import { TError } from "..";

export interface IAuthState {
  isAuthChecked: boolean;
  registerError: null | undefined | TError;
  registerRequest: boolean;
  loginError: null | undefined | TError;
  loginRequest: boolean;
}
