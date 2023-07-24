import { Box, Text, Title } from "@mantine/core";
import { AccountStore } from "../AccountStore";
import { User } from "../types/User";

const AccountList = () => {
  const accountList: User[] = AccountStore.useState((s) => s.userList);

  return (
    <Box>
      <Title>Users :</Title>
      {accountList.map((user: User) => (
        <Text key={user.id}>{user.email}</Text>
      ))}
    </Box>
  );
};

export default AccountList;
