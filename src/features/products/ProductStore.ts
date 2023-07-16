import { Product } from '@/src/api/product.api';
import { Store } from 'pullstate';

export type ProductStoreType = {
    product: Product | null;
    productList: Product[]
};

export const ProductStore = new Store<ProductStoreType>({
    product: null,
    productList: []
});
