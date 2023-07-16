import { Store } from 'pullstate';
import { User } from '../../api/account.api';

export type AccountStoreType = {
    user: User | null;
    userList: User[]
};

export const AccountStore = new Store<AccountStoreType>({
    user: null,
    userList: []
});
