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

const Cookies = () => {
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
          <Title>{t('cookies.title')}</Title>

          {/* Introduction */}
          <Text>{t('cookies.introduction')}</Text>

          {/* What is cookies */}
          <Box>
            <Title order={3}>{t('cookies.definition.title')}</Title>
            <Text>{t('cookies.definition.text')}</Text>
          </Box>

          {/* Cookies usages */}
          <Box>
            <Title order={3}>{t('cookies.uses.title')}</Title>
            <Text>{t('cookies.uses.text')}</Text>
            <List withPadding listStyleType="disc">
              <List.Item>{t('cookies.uses.item1')}</List.Item>
              <List.Item>{t('cookies.uses.item2')}</List.Item>
              <List.Item>{t('cookies.uses.item3')}</List.Item>
            </List>
          </Box>

          {/* Cookies Types */}
          <Box>
            <Title mb={6} order={3}>
              {t('cookies.types.title')}
            </Title>
            <Flex direction={'column'} gap={6}>
              <Text>
                <Text span fw={'bold'} mr={4}>
                  {t('cookies.types.type1.span')}
                </Text>
                {t('cookies.types.type1.text')}
              </Text>

              <Text>
                <Text span fw={'bold'} mr={4}>
                  {t('cookies.types.type2.span')}
                </Text>
                {t('cookies.types.type2.text')}
              </Text>

              <Text>
                <Text span fw={'bold'} mr={4}>
                  {t('cookies.types.type3.span')}
                </Text>
                {t('cookies.types.type3.text')}
              </Text>
            </Flex>
          </Box>

          {/* Cookies Management */}
          <Box>
            <Title order={3}>{t('cookies.management.title')}</Title>
            <Text>{t('cookies.management.text1')}</Text>
            <Text>{t('cookies.management.text2')}</Text>
          </Box>

          {/* Contact us */}
          <Box>
            <Title order={3}>{t('cookies.contact.title')}</Title>
            <Text>
              {t('cookies.contact.text')}{' '}
              <Anchor href={`mailto:${t('cookies.contact.email')}`}>
                {t('cookies.contact.email')}
              </Anchor>
              .
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

