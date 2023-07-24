import { Store } from 'pullstate';
import { Product } from './types/Product';

export type ProductStoreType = {
    product: Product | null;
    productList: Product[]
};

export const ProductStore = new Store<ProductStoreType>({
    product: null,
    productList: []
});
