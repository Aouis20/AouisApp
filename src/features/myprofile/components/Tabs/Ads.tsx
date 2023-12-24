import { AccountStore } from '@/features/accounts/store';
import ProductList from '@/features/products/components/filters/ProductList';
import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const Ads = () => {
  const { t } = useTranslation('');
  const user = AccountStore.useState((s) => s.user);
  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }

  return (
    <Container size={'2xl'}>
      <Title order={2}>Mes annonces</Title>
      <Text>Retrouvez ici toutes vos annonces</Text>
      <ProductList />
    </Container>
  );
};
