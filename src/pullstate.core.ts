import { createPullstateCore } from 'pullstate';
import { UserStore } from './features/users/UserStore';
import { CategoryStore } from './features/categories/CategoryStore';

const stores = {
    UserStore,
    CategoryStore
};

export const PullstateCore = createPullstateCore(stores);

// rome-ignore lint/suspicious/noExplicitAny: the PullstateInstance is not exported by the library
export type PullStateInstance = any;
