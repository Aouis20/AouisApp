import { User } from "@/features/accounts/types/User";
import { Category } from "@/features/categories/types/Category";

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
  images: string[];
  status: StatusType;
  user: User;
  category: Category;
};

type ProductListLinks = {
  next: string | null;
  previous: string | null;
}

export type ProductList = {
  links: ProductListLinks;
  items: number;
  total_items: number;
  page: number;
  total_pages: number;
  results: Product[]
}