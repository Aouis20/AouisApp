import { Payment } from "./Payment"

export type ProductStoreFilters = {
    price: [number, number] | null
    payment_type: Payment[]
}