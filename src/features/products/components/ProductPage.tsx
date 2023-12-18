import { Box, Divider, Drawer, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Filters from './filters/Filters';
import ProductList from './filters/ProductList';

export const ProductPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <Filters open={open} />
      <ProductList />

      {/* Filters */}
      <Drawer opened={opened} onClose={close} title={<Title>Filtres</Title>}>
        <Divider my="sm" />
        {/* From current categories display it filters */}
        <Box></Box>
      </Drawer>
    </Flex>
  );
};

export default ProductPage;
