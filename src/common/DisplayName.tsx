import { AccountStore } from '@/features/accounts/store';
import { User } from '@/features/accounts/types/User';
import { Text } from '@mantine/core';
import _ from 'lodash';

type DisplayNameProps = {
  user?: User;
};

// Render username by preference
// If a user is specified => other account
// Else its the current user
const DisplayName = (props: DisplayNameProps) => {
  let user;
  if (props.user) {
    user = props.user;
  } else {
    user = AccountStore.useState((s) => s.user);
  }
  const name =
    user?.username || user?.first_name || user?.last_name
      ? user.username
        ? user.username
        : _.upperFirst(user?.first_name) + ' ' + user?.last_name?.toUpperCase()
      : user?.email;
  return <Text span>{name}</Text>;
};

export default DisplayName;
