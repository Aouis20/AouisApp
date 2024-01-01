import { ProductList } from '@/features/products/components/ProductList';
import { ProductInformation } from '@/features/products/components/filters/ProductInformations';
import { Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CategoryStore } from '../store';

export const CategoryDetailsPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [display, setDisplay] = useState<'column' | 'row'>('column');
  const category = CategoryStore.useState((s) => s.category)


  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductInformation open={open} setDisplay={setDisplay} />
      <ProductList display={display} category_id={category?.id} />
    </Flex>
  );
};
