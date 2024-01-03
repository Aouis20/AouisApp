import { Container, Paper, Tabs, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Discussions } from '../Discussions';

export const MessagesTab = () => {
  const t = useTranslations();
  return (
    <Container size={'2xl'}>
      <Title order={2}>{t('messages.title')}</Title>
      <Text>{t('messages.description')}</Text>
      <Paper withBorder mt={'xl'}>
        <Tabs defaultValue="purchases">
          <Tabs.List grow>
            <Tabs.Tab value="purchases" fw={'bold'}>
              {t('messages.purchases')}
            </Tabs.Tab>
            <Tabs.Tab value="sales" fw={'bold'}>
              {t('messages.sales')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="purchases">
            <Discussions />
          </Tabs.Panel>

          <Tabs.Panel value="sales">
            <Discussions />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Container>
  );
};
