import { Action } from "redux";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "../store";

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedDispatch = () => useDispatch<AppThunkDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export interface IUseLocation {
  from: {
    pathname: string;
  };
  state: {
    background: string;
    [prop: string]: string;
  };
  [key: string]: any;
}

export interface IUseParams {
  id: string;
}

export type TUser = {
  email: string;
  name: string;
  password: string;
  token: string;
};

export type TUserFetchResponse = {
  success: boolean;
  user: TUser;
};

export type TSetCookieProps = {
  [key: string]: any | {};
};

export type TEventTarget = {
  value: string;
  name: string;
};

export type TError = {
  success?: boolean;
  message?: string;
  status?: number;
};

export type TRefreshData = {
  success: boolean;
  accessToken: string;
};

export type TResponseWithoutPayload = {
  success: boolean;
  message: string;
};
