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

export enum PaymentType {
  UNIQ = 'UNIQ',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum ConditionType {
  MINT = 'MINT',
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
  status: StatusType;
  payment_type: PaymentType;
  condition: ConditionType;
  price: number;
  user: User;
  category: Category;
};

export type ProductList = {
  items: number;
  total_items: number;
  page: number;
  total_pages: number;
  conditions: Record<string, number>
  payment_types: Record<string, number>
  results: Product[]
}