import { createPullstateCore } from 'pullstate';
import { AccountStore } from './features/accounts/AccountStore';
import { CategoryStore } from './features/categories/CategoryStore';

const stores = {
    AccountStore,
    CategoryStore
};

export const PullstateCore = createPullstateCore(stores);

// rome-ignore lint/suspicious/noExplicitAny: the PullstateInstance is not exported by the library
export type PullStateInstance = any;
