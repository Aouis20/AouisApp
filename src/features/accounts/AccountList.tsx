import { Box, Text, Title } from "@mantine/core";
import { User } from "../api/account.api";
import { AccountStore } from "./AccountStore";

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
