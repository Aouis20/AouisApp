import { Store } from 'pullstate';
import { User } from './types/User';

export type AccountStoreType = {
    user: User | null;
    userList: User[]
};

export const AccountStore = new Store<AccountStoreType>({
    user: null,
    userList: []
});
