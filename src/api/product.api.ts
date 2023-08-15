import { Product, ProductList } from '@/features/products/types/Product';
import { KyInstance } from 'ky/distribution/types/ky';

export type ProductListFilter = {
  user_id?: number | null;
};

export const getProducts = async (page: number, filters: ProductListFilter, api: KyInstance): Promise<ProductList> => {
  const data = await api.post(`products/list-product/?page=${page}`, { json: filters }).json<ProductList>();
  return data;
};

export const getProductById = async (id: number, api: KyInstance): Promise<Product> => {
  const data = await api.get(`products/${id}`).json<Product>();
  return data;
};
