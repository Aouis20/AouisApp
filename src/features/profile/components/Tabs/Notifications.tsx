import { Container, Stack, Text, Title } from '@mantine/core';
import { NotificationItem } from '../NotificationItem';
import { useTranslations } from 'next-intl';

const notifications = [
  {
    name: "John DOE",
    type: 'message',
  },
  {
    type: 'news',
  },
];

export const NotificationsTab = () => {
  const t = useTranslations()
  return (
    <Container size={'2xl'}>
      <Title order={2}>{t('profileNotifications.title')}</Title>
      <Text>{t('profileNotifications.description')}</Text>
      <Stack mt={'xl'} gap={'xl'}>
        {notifications.map((notification) => (
          <NotificationItem notification={notification} />
        ))}
      </Stack>
    </Container>
  );
};
