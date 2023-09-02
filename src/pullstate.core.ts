import { createPullstateCore } from 'pullstate';
import { AccountStore } from './features/accounts/store';
import { CategoryStore } from './features/categories/store';
import { ProductStore } from './features/products/store';

const stores = {
    AccountStore,
    CategoryStore,
    ProductStore
};

export const PullstateCore = createPullstateCore(stores);

// rome-ignore lint/suspicious/noExplicitAny: the PullstateInstance is not exported by the library
export type PullStateInstance = any;
