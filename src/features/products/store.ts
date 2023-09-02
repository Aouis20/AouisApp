import { Store } from 'pullstate';
import { Product, ProductList } from './types/Product';
import { ProductStoreFilters } from './types/ProductStoreFilters';

export type ProductStoreType = {
    product: Product | null;
    productList: ProductList | null;
    filters: ProductStoreFilters
};

export const ProductStore = new Store<ProductStoreType>({
    product: null,
    productList: null,
    filters: {
        price: null,
        payment_type: []
    }
});
