import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

export const page404 = () => {
  const router = useRouter();
  return (
    <Container mt={'xl'}>
      <Stack gap={'xl'}>
        <Title>Erreur 404 : Page non trouvée</Title>
        <Text c="dimmed" size="lg">
          La page que vous essayez d'accéder n'existe pas ou n'est pas
          disponible.
        </Text>
        <Button
          onClick={() => router.replace('/')}
          variant="outline"
          size="lg"
          mt="xl"
        >
          Retour à la page d'accueil
        </Button>
      </Stack>
    </Container>
  );
};

export default page404;
