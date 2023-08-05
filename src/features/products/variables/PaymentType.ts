import { PaymentType } from "../types/Product";

export const paymentType = {
    [PaymentType.WEEKLY]: '/semaine',
    [PaymentType.MONTHLY]: '/mois',
    [PaymentType.YEARLY]: '/an',
};