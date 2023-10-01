import { Anchor, Group, Image, createStyles } from '@mantine/core';
import router from 'next/router';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  links: {
    cursor: 'pointer',
    color: 'gray',
    padding: 16,
  },
}));

const FooterSection = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('documents');
  return (
    <Group
      spacing={0}
      position="apart"
      sx={{ borderTop: '1px solid #dee2e6' }}
      px={'lg'}
    >
      <Image
        sx={{ cursor: 'pointer' }}
        onClick={() => router.push('/')}
        alt={'logo'}
        src={'/logo.png'}
        width={150}
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
