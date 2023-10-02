import { Container, Flex, Paper, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Settings } from '../../types/Settings';
import { SwitchContainer } from '../SwitchContainer';

const Settings = () => {
  const { t } = useTranslation('settings');

  const settings: Settings = {
    identity: {
      title: t('identity.title'),
      description: t('identity.description'),
      options: {
        nickname: {
          title: t('identity.options.nickname.title'),
          description: t('identity.options.nickname.description'),
          isChecked: true,
        },
        email: {
          title: t('identity.options.email.title'),
          description: t('identity.options.email.description'),
          isChecked: false,
        },
        nothing: {
          title: t('identity.options.nothing.title'),
          description: t('identity.options.nothing.description'),
          isChecked: false,
        },
      },
    },
    notifications: {
      title: t('notifications.title'),
      description: t('notifications.description'),
      options: {
        all: {
          title: t('notifications.options.all.title'),
          description: t('notifications.options.all.description'),
          isChecked: true,
        },
        essentials: {
          title: t('notifications.options.essentials.title'),
          description: t('notifications.options.essentials.description'),
          isChecked: false,
        },
        nothing: {
          title: t('notifications.options.nothing.title'),
          description: t('notifications.options.nothing.description'),
          isChecked: false,
        },
      },
    },
    cookies: {
      title: t('cookies.title'),
      description: t('cookies.description'),
      options: {
        all: {
          title: t('cookies.options.all.title'),
          description: t('cookies.options.all.description'),
          isChecked: true,
        },
        essentials: {
          title: t('cookies.options.essentials.title'),
          description: t('cookies.options.essentials.description'),
          isChecked: false,
        },
        performance: {
          title: t('cookies.options.performance.title'),
          description: t('cookies.options.performance.description'),
          isChecked: false,
        },
        nothing: {
          title: t('cookies.options.nothing.title'),
          description: t('cookies.options.nothing.description'),
          isChecked: false,
        },
      },
    },
    commercials: {
      title: t('commercials.title'),
      description: t('commercials.description'),
      options: {
        commercialsOffers: {
          title: t('commercials.options.commercialsOffers.title'),
          description: t('commercials.options.commercialsOffers.description'),
          isChecked: true,
        },
        targetedAdvertising: {
          title: t('commercials.options.targetedAdvertising.title'),
          description: t('commercials.options.targetedAdvertising.description'),
          isChecked: false,
        },
      },
    },
  };

  return (
    <Container size={'2xl'}>
      <Paper shadow="sm" radius="md" p="lg" withBorder mb={'lg'}>
        <Title order={2}>{t('title')}</Title>
        <Text>{t('description')}</Text>
      </Paper>
      <Flex gap={'xl'} wrap={'wrap'}>
        {Object.values(settings).map((setting) => (
          <SwitchContainer setting={setting} />
        ))}
      </Flex>
    </Container>
  );
};

export default Settings;
