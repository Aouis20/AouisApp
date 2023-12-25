import { Container, Text, Title } from '@mantine/core';
import { HistoricTable } from '../HistoricTable';

export const HistoricTab = () => {
  // TODO: Make a request that run only if we are on this page
  return (
    <Container size={'2xl'}>
      <Title order={2}>Historique</Title>
      <Text>Retrouvez ici l'historique de vos transactions</Text>
      <HistoricTable />
    </Container>
  );
};
