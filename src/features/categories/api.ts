import { Category } from '@/features/categories/types/Category';
import { KyInstance } from 'ky/distribution/types/ky';

export const getCategories = async (api: KyInstance): Promise<Category[]> => {
  const data = await api.get('categories/').json<Category[]>();
  return data;
};

export const getCategoryById = async (id: number, api: KyInstance): Promise<Category> => {
  const data = await api.get(`categories/${id}`).json<Category>();
  return data;
};