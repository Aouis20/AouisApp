import DataTableDemo from '@/features/products/components/ProductTable';
import { Container, Text, Title } from '@mantine/core';

export const Historic = () => {
  // TODO: Make a request that run only if we are on this page
  return (
    <Container size={'2xl'}>
      <Title order={2}>Historique</Title>
      <Text>Retrouvez ici l'historique de vos transactions</Text>
      <DataTableDemo />
    </Container>
  );
};
