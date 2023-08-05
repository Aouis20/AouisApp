import { createPullstateCore } from 'pullstate';
import { AccountStore } from './features/accounts/AccountStore';
import { CategoryStore } from './features/categories/CategoryStore';
import { ProductStore } from './features/products/ProductStore';

const stores = {
    AccountStore,
    CategoryStore,
    ProductStore
};

export const PullstateCore = createPullstateCore(stores);

// rome-ignore lint/suspicious/noExplicitAny: the PullstateInstance is not exported by the library
export type PullStateInstance = any;
