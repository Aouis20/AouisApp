import { Anchor, Group, Image } from '@mantine/core';
import { useTranslations } from 'next-intl';
import router from 'next/router';

export const FooterSection = () => {
  const t = useTranslations();
  return (
    <Group
      gap={0}
      justify="space-between"
      px={'xl'}
      pt={'sm'}
      mt={'xl'}
      style={{ borderTop: '1px solid lightgray' }}
    >
      <Image
        style={{ cursor: 'pointer' }}
        onClick={() => router.push('/')}
        alt={'logo'}
        src={'/logo.png'}
        w={150}
      />
      <Group c="gray" py={'md'}>
        <Anchor href="/terms" c={'gray'} p={'sm'}>
          {t('termsOfServiceTitle')}
        </Anchor>
        <Anchor href="/privacy" c={'gray'} p={'sm'}>
          {t('privacyTitle')}
        </Anchor>
        <Anchor href="/cookies" c={'gray'} p={'sm'}>
          {t('cookiesTitle')}
        </Anchor>
      </Group>
    </Group>
  );
};
