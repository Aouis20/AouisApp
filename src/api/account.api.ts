import { KyInstance } from 'ky/distribution/types/ky';
import { TokensType } from '../features/authentication/tokens.helper';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;

  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
};

export type SignInPayloadType = {
  email: string;
  password: string;
};

// rome-ignore lint/suspicious/noExplicitAny: for build process
export const signInUser = async (payload: SignInPayloadType, api: KyInstance): Promise<any> => {
  const data = await api.post('auth/token/', { json: payload }).json<any>();
  return data;
};

export type SignUpPayloadType = {
  email: string;
  password: string;
  confirmation: string;
};

export const getUserList = async (api: KyInstance): Promise<any> => {
  const data = await api.get('accounts/').json<any>();
  return data;
};

export const signUpUser = async (payload: SignUpPayloadType, api: KyInstance): Promise<any> => {
  const data = await api.post('accounts/', { json: payload }).json<any>();
  return data;
};

export const getUserByToken = async (api: KyInstance): Promise<User> => {
  const data = await api.get('auth/verify/').json<User>();
  return data;
};

export type RefreshUserAccessTokenResponseType = {
  access: string;
};

export const refreshUserAccessToken = async (
  payload: TokensType,
  api: KyInstance
): Promise<RefreshUserAccessTokenResponseType> => {
  const data = await api
    .post('auth/refresh/', {
      json: {
        refresh: payload.refresh
      }
    })
    .json<RefreshUserAccessTokenResponseType>();
  return data;
};
