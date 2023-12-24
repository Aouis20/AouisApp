import { Button } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';

export const BackLinkButton = () => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => router.back()}
      my={'xl'}
      variant="default"
      leftSection={<IconArrowNarrowLeft />}
    >
      {t('common:back')}
    </Button>
  );
};
