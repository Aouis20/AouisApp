import { Box, Text, Title } from "@mantine/core";
import { UserStore } from "./UserStore";
import { User } from "../api/user.api";

const UserList = () => {
  const userList: User[] = UserStore.useState((s) => s.userList);

  return (
    <Box>
      <Title>Users :</Title>
      {userList.map((user: User) => (
        <Text key={user.id}>{user.email}</Text>
      ))}
    </Box>
  );
};

export default UserList;
