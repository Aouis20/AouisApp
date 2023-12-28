import { Button } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import router from 'next/router';

export const BackLinkButton = () => {
  const t = useTranslations();
  return (
    <Button
      onClick={() => router.back()}
      my={'xl'}
      variant="default"
      leftSection={<IconArrowNarrowLeft />}
    >
      {t('back')}
    </Button>
  );
};
