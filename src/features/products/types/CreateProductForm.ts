import { ConditionType, PaymentType } from "./Product";

export enum CreateStatusType {
  FOR_SALE = "FOR_SALE",
  TO_EXCHANGE = "TO_EXCHANGE",
  RESERVED = "RESERVED",
}

export type CreateProductFormType = {
    isService: boolean;
    images?: any,
    title: string,
    description?: string,
    price: number,
    category?: string,
    payment_type: PaymentType,
    condition?: ConditionType,
    status?: CreateStatusType,
    visibility: boolean
}