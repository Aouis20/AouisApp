import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  List,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import router from 'next/router';

export const Privacy = () => {
  const t = useTranslations();
  return (
    <Box>
      <Container size={'xl'} my={'xl'}>
        <Button
          onClick={() => router.back()}
          my={'xl'}
          variant="default"
          leftSection={<IconArrowNarrowLeft />}
        >
          {t('back')}
        </Button>
        <Flex direction={'column'} gap={64}>
          <Title>{t('privacy.title')}</Title>

          {/* Introduction */}
          <Text>{t('privacy.introduction')}</Text>

          {/* Data collection */}
          <Box>
            <Title order={3}>{t('privacy.dataCollection.title')}</Title>
            <Text>{t('privacy.dataCollection.text')}</Text>
          </Box>

          {/* Data usages */}
          <Box>
            <Title order={3}>{t('privacy.dataUses.title')}</Title>
            <Text>{t('privacy.dataUses.text')}</Text>
            <List withPadding listStyleType="disc">
              <List.Item>{t('privacy.dataUses.item1')}</List.Item>
              <List.Item>{t('privacy.dataUses.item2')}</List.Item>
              <List.Item>{t('privacy.dataUses.item3')}</List.Item>
              <List.Item>{t('privacy.dataUses.item4')}</List.Item>
            </List>
          </Box>

          {/* Data sharing */}
          <Box>
            <Title order={3}>{t('privacy.sharing.title')}</Title>
            <Text>{t('privacy.sharing.text')}</Text>
            <List withPadding listStyleType="disc">
              <List.Item>{t('privacy.sharing.item1')}</List.Item>
              <List.Item>{t('privacy.sharing.item2')}</List.Item>
              <List.Item>{t('privacy.sharing.item3')}</List.Item>
            </List>
          </Box>

          {/* Protection */}
          <Box>
            <Title order={3}>{t('privacy.protection.title')}</Title>
            <Text>{t('privacy.protection.text')}</Text>
          </Box>

          {/* Rights */}
          <Box>
            <Title order={3}>{t('privacy.rights.title')}</Title>
            <Text>
              {t('privacy.rights.text')}{' '}
              <Anchor href={`mailto:${t('privacy.rights.email')}`}>
                {t('privacy.rights.email')}
              </Anchor>
              .
            </Text>
          </Box>

          {/* Politic modifications */}
          <Box>
            <Title order={3}>{t('privacy.politicModifications.title')}</Title>
            <Text>{t('privacy.politicModifications.text')}</Text>
          </Box>

          {/* Contact us */}
          <Box>
            <Title order={3}>{t('privacy.contact.title')}</Title>
            <Text>
              {t('privacy.contact.text')}{' '}
              <Anchor href={`mailto:${t('privacy.contact.email')}`}>
                {t('privacy.contact.email')}
              </Anchor>
              .
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
