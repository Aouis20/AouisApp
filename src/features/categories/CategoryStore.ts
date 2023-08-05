import { Store } from 'pullstate';
import { Category } from './types/Category';

export type CategoryStoreType = {
    category: Category | null;
    categoryList: Category[]
};

export const CategoryStore = new Store<CategoryStoreType>({
    category: null,
    categoryList: []
});
