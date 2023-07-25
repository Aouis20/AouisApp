import { Product, ProductList } from '@/features/products/types/Product';
import { KyInstance } from 'ky/distribution/types/ky';

export const getProducts = async (api: KyInstance): Promise<ProductList> => {
  const data = await api.get('products/').json<ProductList>();
  return data;
};

export const getProductById = async (id: number, api: KyInstance): Promise<Product> => {
  const data = await api.get(`products/${id}`).json<Product>();
  return data;
};

export const getProductByPage = async (page: number, api: KyInstance): Promise<ProductList> => {
  const data = await api.get(`products/?page=${page}`).json<ProductList>();
  return data;
};