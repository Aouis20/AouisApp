import { KyInstance } from 'ky/distribution/types/ky';
import { Category } from './category.api';
import { User } from './account.api';

export enum StatusType {
    SOLD = 'Sold',
    FOR_SALE = "FOR_SALE",

    EXCHANGED = "EXCHANGED",
    TO_EXCHANGE = "TO_EXCHANGE",

    REFUNDED = "REFUNDED",
    TO_REFUNDED = "TO_REFUNDED",

    RESERVED = "RESERVED",
    PENDING_PAYMENT = "PENDING_PAYMENT",
    NEGOTIATING = "NEGOTIATING",
}

export type Product = {
  id: number;
  title: string;
  description: string;
  status: StatusType;
  category: Category;
  user: User;
  images: string[];
};


export const getProducts = async (api: KyInstance): Promise<Product[]> => {
  const data = await api.get('products/').json<Product[]>();
  return data;
};
