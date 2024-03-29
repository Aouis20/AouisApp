import { LoginPayloadType } from '@/features/accounts/types/LoginPayloadType';
import { RefreshUserAccessTokenResponseType } from '@/features/accounts/types/RefreshToken';
import { User } from '@/features/accounts/types/User';
import { KyInstance } from 'ky/distribution/types/ky';
import { TokensType } from './tokens.helper';

export const loginUser = async (payload: LoginPayloadType, api: KyInstance): Promise<any> => {
  const data = await api.post('auth/token/', { json: payload }).json<any>();
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
