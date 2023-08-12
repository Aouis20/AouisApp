import DataTableDemo from '@/features/products/components/ProductTable';
import { Container, Paper, Text, Title } from '@mantine/core';

const Historic = () => {
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Historique</Title>
        <Text>Retrouvez ici l'historique de vos transactions</Text>
      </Paper>
      <DataTableDemo />
    </Container>
  );
};

export default Historic;
