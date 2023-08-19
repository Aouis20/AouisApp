import { Container, Paper, Text, Title } from '@mantine/core';

const Settings = () => {
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Paramètres</Title>
        <Text>Gérez ici tous vos paramètres.</Text>
      </Paper>
    </Container>
  );
};

export default Settings;
