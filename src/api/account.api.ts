import { KyInstance } from 'ky/distribution/types/ky';
import { TokensType } from '../features/authentication/tokens.helper';
import { User } from '@/features/accounts/types/User';
import { SignUpPayloadType } from '@/features/accounts/types/SignUp';
import { SignInPayloadType } from '@/features/accounts/types/SignIn';
import { RefreshUserAccessTokenResponseType } from '@/features/accounts/types/RefreshToken';

// rome-ignore lint/suspicious/noExplicitAny: for build process
export const signInUser = async (payload: SignInPayloadType, api: KyInstance): Promise<any> => {
  const data = await api.post('auth/token/', { json: payload }).json<any>();
  return data;
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
