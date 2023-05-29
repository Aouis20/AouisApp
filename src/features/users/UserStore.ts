import { Store } from 'pullstate';
import { User } from '../api/user.api';

export type UserStoreType = {
    user: User | null;
    userList: User[]
};

export const UserStore = new Store<UserStoreType>({
    user: null,
    userList: []
});
