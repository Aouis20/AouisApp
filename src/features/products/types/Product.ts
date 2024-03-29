import { User } from "@/features/accounts/types/User";
import { Category } from "@/features/categories/types/Category";
import { ImageType } from "./ImageType";

export enum StatusType {
  SOLD = 'Sold',
  FOR_SALE = "FOR_SALE",

  EXCHANGED = "EXCHANGED",
  TO_EXCHANGE = "TO_EXCHANGE",

  REFUNDED = "REFUNDED",
  PENDING_REFUND = "PENDING_REFUND",

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
  created_at: string;
  updated_at: string;
  archived_at: string;
  id: number;
  title: string;
  description: string | null;
  images : ImageType[];
  status: StatusType;
  payment_type: PaymentType;
  condition: ConditionType;
  price: number;
  is_service: boolean;
  category: Category;
  owner: User;
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