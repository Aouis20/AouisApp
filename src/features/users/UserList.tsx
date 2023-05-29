import { Box, Text, Title } from "@mantine/core";
import { UserStore } from "./UserStore";
import { User } from "./user.api";

const UserList = () => {
  const userList: User[] = UserStore.useState((s) => s.userList);
  console.log(userList);

  return (
    <Box>
      <Title>Users :</Title>
      {userList.map((user: User) => (
        <Text>{user.email}</Text>
      ))}
    </Box>
  );
};

export default UserList;
