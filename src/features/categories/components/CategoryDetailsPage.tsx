import { ProductList } from '@/features/products/components/ProductList';
import { ProductInformation } from '@/features/products/components/filters/ProductInformations';
import { Box, Divider, Drawer, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CategoryStore } from '../store';
import { useTranslations } from 'next-intl';

export const CategoryDetailsPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [display, setDisplay] = useState<'column' | 'row'>('column');
  const category = CategoryStore.useState((s) => s.category)
  const t = useTranslations()

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductInformation open={open} setDisplay={setDisplay} />
      <ProductList display={display} category_id={category?.id} />
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
