import { Paper, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { NotificationType } from '../types/NotificationType';

type NotificationItemProps = {
  notification: NotificationType;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const t = useTranslations();
  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Title order={4}>
        {t(`profileNotifications.type.${notification.type}.title`)}
      </Title>
      <Text c="dimmed">
        {t(`profileNotifications.type.${notification.type}.text`, {
          name: notification.name,
        })}
      </Text>
    </Paper>
  );
};
