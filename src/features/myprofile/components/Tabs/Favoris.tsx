import { Container, Paper, Text, Title } from '@mantine/core';

const Favoris = () => {
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Favoris</Title>
        <Text>Retrouvez ici vos annonces favorites.</Text>
      </Paper>
    </Container>
  );
};

export default Favoris;
