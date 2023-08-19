import DataTableDemo from '@/features/products/components/ProductTable';
import ProductList from '@/features/products/components/filters/ProductList';
import { Container, Paper, Text, Title } from '@mantine/core';

const Historic = () => {
  // TODO: Make a request that run only if we are on this page
  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Historique</Title>
        <Text>Retrouvez ici l'historique de vos transactions</Text>
      </Paper>
      <ProductList />
      <DataTableDemo />
    </Container>
  );
};

export default Historic;
