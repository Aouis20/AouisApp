import { Product } from '@/features/products/types/Product';
import { KyInstance } from 'ky/distribution/types/ky';

export const getProducts = async (api: KyInstance): Promise<Product[]> => {
  const data = await api.get('products/').json<Product[]>();
  return data;
};
