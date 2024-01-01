import { FileWithPath } from "@mantine/dropzone";
import { ConditionType, PaymentType } from "./Product";

export enum CreateStatusType {
  FOR_SALE = "FOR_SALE",
  TO_EXCHANGE = "TO_EXCHANGE",
  RESERVED = "RESERVED",
}

export type CreateProductFormType = {
  is_service: boolean;
  images?: FileWithPath[],
  title: string,
  description: string | null,
  price: number | string,
  category?: string | number,
  payment_type: PaymentType,
  condition?: ConditionType,
  status: CreateStatusType,
  visibility: boolean
}