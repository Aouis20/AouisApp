import { Product, ProductList } from '@/features/products/types/Product';
import { KyInstance } from 'ky/distribution/types/ky';
import { SearchPayload } from '../search/types/SearchPayload';
import { CreateProductFormType } from './types/CreateProductForm';

export type ProductListFilter = {
  user_id?: number | null;
  ids?: number[]
};

export const getProducts = async (page: number, filters: ProductListFilter, api: KyInstance): Promise<ProductList> => {
  const data = await api.post(`products/list-product/?page=${page}`, { json: filters }).json<ProductList>();
  return data;
};

export const getProductById = async (id: number, api: KyInstance): Promise<Product> => {
  const data = await api.get(`products/${id}`).json<Product>();
  return data;
};

export const createProduct = async (payload: CreateProductFormType, api: KyInstance): Promise<Product> => {
  const data = await api.post('products/', { json: payload }).json<Product>();
  return data;
};

export const submitSearch = async (payload: SearchPayload, api: KyInstance): Promise<ProductList> => {
  const data = await api.post('products/search', { json: payload }).json<ProductList>();
  return data;
};
