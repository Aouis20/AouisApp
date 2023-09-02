import { AccountStore } from '@/features/accounts/store';
import ProductList from '@/features/products/components/filters/ProductList';
import { Container, Paper, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const Ads = () => {
  const { t } = useTranslation('');
  const user = AccountStore.useState((s) => s.user);
  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }

  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Mes annonces</Title>
        <Text>Retrouvez ici toutes vos annonces</Text>
      </Paper>
      <ProductList />
    </Container>
  );
};

export default Ads;
