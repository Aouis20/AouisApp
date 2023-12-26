import { Anchor, Group, Image } from '@mantine/core';
import { useTranslations } from 'next-intl';
import router from 'next/router';

const FooterSection = () => {
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
        <Anchor href="/documents/terms" c={'gray'} p={'sm'}>
          {t('termsOfService.title')}
        </Anchor>
        <Anchor href="/documents/privacy" c={'gray'} p={'sm'}>
          {t('privacy.title')}
        </Anchor>
        <Anchor href="/documents/cookies" c={'gray'} p={'sm'}>
          {t('cookies.title')}
        </Anchor>
      </Group>
    </Group>
  );
};

export default FooterSection;
