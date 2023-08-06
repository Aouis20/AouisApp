import { AccountStore } from '@/features/accounts/AccountStore';
import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const Ads = () => {
  const user = AccountStore.useState((s) => s.user);
  if (!user) {
    return <Text>Veuillez vous authentifier</Text>;
  }
  const { t } = useTranslation('');

  return (
    <Container size={'2xl'}>
      <Title order={2}>Mes annonces</Title>
      <Text>Retrouvez ici toutes vos annonces</Text>
    </Container>
  );
};

export default Ads;
