import { KyInstance } from 'ky/distribution/types/ky';
import { TokensType } from '../authentication/tokens.helper';

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
export type SignInResponseType = any;
export const signInUser = async (payload: SignInPayloadType, api: KyInstance): Promise<SignInResponseType> => {
  const data = await api.post('auth/token/', { json: payload }).json<SignInResponseType>();
  return data;
};

export type SignUpPayloadType = {
  email: string;
  password: string;
  confirmation: string;
  token: string;
};
export type SignUpResponseType = User;
export const signUpUser = async (payload: SignUpPayloadType, api: KyInstance): Promise<SignUpResponseType> => {
  const data = await api.post('accounts/', { json: payload }).json<SignUpResponseType>();
  return data;
};

export type GetUserByTokenResponseType = User;
export const getUserByToken = async (api: KyInstance): Promise<GetUserByTokenResponseType> => {
  const data = await api.get('auth/verify/').json<GetUserByTokenResponseType>();
  return data;
};

export type RefreshUserAccessTokenPayloadType = TokensType;
export type RefreshUserAccessTokenResponseType = {
  access: string;
};
export const refreshUserAccessToken = async (
  payload: RefreshUserAccessTokenPayloadType,
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
