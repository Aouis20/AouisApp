import { SignUpPayloadType } from '@/features/accounts/types/SignUp';
import { User } from '@/features/accounts/types/User';
import { KyInstance } from 'ky/distribution/types/ky';

export const getUserList = async (api: KyInstance): Promise<any> => {
  const data = await api.get('accounts/').json<any>();
  return data;
};

export const signUpUser = async (payload: SignUpPayloadType, api: KyInstance): Promise<any> => {
  const data = await api.post('accounts/', { json: payload }).json<any>();
  return data;
};

export const updateUser = async (id: number, partialUser: Partial<User>, api: KyInstance): Promise<User> => {
  const data = await api.patch(`accounts/${id}/`, { json: partialUser }).json<User>();
  return data;
};