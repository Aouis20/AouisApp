import { Container, Flex, Paper, Text, Title } from '@mantine/core';
import { SwitchContainer } from '../SwitchContainer';

const Settings = () => {
  const notifications = {
    all: {
      title: 'Toutes',
      description: 'Recevoir toutes les notifications',
      isChecked: true,
    },
    essentials: {
      title: 'Essentielles',
      description: 'Recevoir uniquement les notifications essentielles',
      isChecked: false,
    },
    nothing: {
      title: 'Aucune',
      description: 'Ignorer toutes les notifications',
      isChecked: false,
    },
  };

  const cookies = {
    all: {
      title: 'Tous',
      description: 'Accepter tous les cookies',
      isChecked: true,
    },
    essentials: {
      title: 'Nécessaires',
      description:
        'Ces cookies sont essentiels pour utiliser le site web et ses fonctionnalités',
      isChecked: false,
    },
    performance: {
      title: 'Performance',
      description:
        'Ces cookies aident à l’amélioration des performances du site.',
      isChecked: false,
    },
    nothing: {
      title: 'Aucune',
      description: 'Refuser tous les cookies',
      isChecked: false,
    },
  };

  const identity = {
    nickname: {
      title: 'Pseudonyme',
      description: 'Utiliser mon pseudonyme',
      isChecked: true,
    },
    email: {
      title: 'Adresse mail',
      description: 'Adresse mail vérifiée',
      isChecked: false,
    },
    nothing: {
      title: 'Téléphone',
      description: 'Numéro de téléphone vérifié',
      isChecked: false,
    },
  };

  const commercials = {
    commercialsOffers: {
      title: 'Offres commerciales',
      description: 'Recevoir des offres commerciales',
      isChecked: true,
    },
    targetedAdvertising: {
      title: 'Publicité ciblée',
      description: 'Personnaliser les publicités en fonction de vos tendances',
      isChecked: false,
    },
  };

  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>Paramètres</Title>
        <Text>Personnalisez et gérer les réglages à votre convenance.</Text>
      </Paper>
      <Flex gap={'lg'} wrap={'wrap'}>
        <SwitchContainer
          title="Notifications"
          description="Personnalisez les notifications à recevoir."
          settings={notifications}
        />
        <SwitchContainer
          title="Cookies"
          description="Gérez ici vos cookies."
          settings={cookies}
        />
        <SwitchContainer
          title="Identité"
          settings={identity}
        />
        <SwitchContainer
          title="Commerciales"
          description="Commerciales"
          settings={commercials}
        />
      </Flex>
    </Container>
  );
};

export default Settings;
