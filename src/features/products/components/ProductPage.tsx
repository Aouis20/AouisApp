import { Box, Divider, Drawer, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ProductList } from './ProductList';
import Filters from './filters/Filters';

export const ProductPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [display, setDisplay] = useState<'column' | 'row'>('column');
  const t = useTranslations();

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <Filters open={open} setDisplay={setDisplay} />
      <ProductList display={display} />

      {/* Filters */}
      <Drawer
        opened={opened}
        onClose={close}
        title={<Title>{t('filters')}</Title>}
      >
        <Divider my="sm" />
        {/* From current categories display it filters */}
        <Box></Box>
      </Drawer>
    </Flex>
  );
};
