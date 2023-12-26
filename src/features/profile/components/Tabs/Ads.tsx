import { AccountStore } from '@/features/accounts/store';
import { ProductList } from '@/features/products/components/ProductList';
import { Container, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const AdsTab = () => {
  const t = useTranslations();
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
