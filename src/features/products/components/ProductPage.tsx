import { Box, Divider, Drawer, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductStore } from '../store';
import ProductHeader from './ProductHeader';
import Filters from './filters/Filters';
import ProductList from './filters/ProductList';

export const ProductPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const productList = ProductStore.useState((s) => s.productList);

  // TODO filtres (voir la centrale)
  // Footer avec code départemental + distance en km (demande l'autorisation à l'utilsateur de prendre sa position (useEffect au changement qui va réactualiser tous les produits) puis calcul)
  // Button pour engager la discussion avec le propriétaire du product
  // [OPTIONNEL] Chatbox si need help ?

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductHeader />
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
