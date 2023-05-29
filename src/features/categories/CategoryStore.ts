import { Category } from '@/src/features/api/category.api';
import { Store } from 'pullstate';

export type CategoryStoreType = {
    category: Category | null;
    categories: Category[]
};

export const CategoryStore = new Store<CategoryStoreType>({
    category: null,
    categories: []
});
