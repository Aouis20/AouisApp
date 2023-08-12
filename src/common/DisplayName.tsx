import { User } from '@/features/accounts/types/User';
import { Text } from '@mantine/core';
import _ from 'lodash';

type DisplayNameProps = {
  user: User;
};

const DisplayName = (props: DisplayNameProps) => {
  const { user } = props;
  console.log('🚀 ~ file: DisplayName.tsx:11 ~ DisplayName ~ user:', user);
  const name = user.username
    ? user.username
    : _.upperFirst(user.first_name) + ' ' + user.last_name?.toUpperCase();
  return <Text span>{name}</Text>;
};

export default DisplayName;
