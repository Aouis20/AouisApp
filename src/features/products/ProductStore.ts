import { Store } from 'pullstate';
import { Product, ProductList } from './types/Product';

export type ProductStoreType = {
    product: Product | null;
    productList: ProductList | null
};

export const ProductStore = new Store<ProductStoreType>({
    product: null,
    productList: null
});
