import { Box, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { AccountStore } from '../store';

export const AccountDetails = () => {
  const account = AccountStore.useState((s) => s.account);
  const t = useTranslations();

  if (!account) return <Text>{t('noData')}</Text>;

  return (
    <Box>
      <Title>{account.username}</Title>
    </Box>
  );
};
