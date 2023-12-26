import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import router from 'next/router';

export default function Terms() {
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
          <Title>{t('termsOfService.title')}</Title>

          {/* Property */}
          <Box>
            <Title order={3}>{t('termsOfService.property.title')}</Title>
            <Text>{t('termsOfService.property.text')}</Text>
          </Box>

          {/* Personnal datas */}
          <Box>
            <Title order={3}>{t('termsOfService.datas.title')}</Title>
            <Text>{t('termsOfService.datas.text')}</Text>
          </Box>

          {/* TExternals links */}
          <Box>
            <Title order={3}>{t('termsOfService.externalLinks.title')}</Title>
            <Text>{t('termsOfService.externalLinks.text')}</Text>
          </Box>

          {/* Responsability */}
          <Box>
            <Title order={3}>{t('termsOfService.responsability.title')}</Title>
            <Text>{t('termsOfService.responsability.text')}</Text>
          </Box>

          {/* Contact us */}
          <Box>
            <Title order={3}>{t('termsOfService.contact.title')}</Title>
            <Text>
              {t('termsOfService.contact.text')}{' '}
              <Anchor href={`mailto:${t('termsOfService.contact.email')}`}>
                {t('termsOfService.contact.email')}
              </Anchor>
              .
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
