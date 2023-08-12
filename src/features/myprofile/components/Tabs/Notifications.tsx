import { Container, Paper, Text, Title } from '@mantine/core';

const Notifications = () => {
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Notifications</Title>
        <Text>Retrouvez ici vos notifications.</Text>
      </Paper>
    </Container>
  );
};

export default Notifications;
