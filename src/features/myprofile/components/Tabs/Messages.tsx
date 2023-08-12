import { Container, Paper, Text, Title } from '@mantine/core';

const Messages = () => {
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Messages</Title>
        <Text>Retrouvez ici, votre fil de discussion.</Text>
      </Paper>
    </Container>
  );
};

export default Messages;
