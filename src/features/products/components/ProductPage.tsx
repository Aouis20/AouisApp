import { Box, Divider, Drawer, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ProductList } from './ProductList';
import { ProductInformation } from './filters/ProductInformations';
import { ResultsList } from '@/features/search/components/ResultsList';

type ProductPageProps = {
  isSearch?: boolean;
};

export const ProductPage = ({ isSearch = false }: ProductPageProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [display, setDisplay] = useState<'column' | 'row'>('column');
  const t = useTranslations();

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductInformation open={open} setDisplay={setDisplay} />
      {isSearch ? <ResultsList /> : <ProductList display={display} />}

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
