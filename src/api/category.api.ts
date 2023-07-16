import { KyInstance } from 'ky/distribution/types/ky';

export type Category = {
  id: number;
  name: string;
};


export const getCategories = async (api: KyInstance): Promise<Category[]> => {
  const data = await api.get('categories/').json<Category[]>();
  return data;
};