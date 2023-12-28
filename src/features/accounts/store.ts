import { Store } from 'pullstate';
import { User } from './types/User';

export type AccountStoreType = {
    user: User | null;
    userList: User[],
    account: User | null
};

export const AccountStore = new Store<AccountStoreType>({
    user: null,
    userList: [],
    account: null
});
