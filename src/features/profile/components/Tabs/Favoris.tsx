import { AccountStore } from '@/features/accounts/store';
import { ProductList } from '@/features/products/components/ProductList';
import { Container, Text, Title } from '@mantine/core';

export const Favoris = () => {
  const user = AccountStore.useState((s) => s.user);

  return (
    <Container size={'2xl'}>
      <Title order={2}>Favoris</Title>
      <Text>Retrouvez ici vos annonces favoris.</Text>
      <ProductList ids={user?.favoris} />
    </Container>
  );
};
