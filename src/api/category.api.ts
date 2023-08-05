import { Category } from '@/features/categories/types/Category';
import { KyInstance } from 'ky/distribution/types/ky';

export const getCategories = async (api: KyInstance): Promise<Category[]> => {
  const data = await api.get('categories/').json<Category[]>();
  return data;
};