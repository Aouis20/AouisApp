import { setupPrivateApi } from '@/api';
import { getProductByPage } from '@/api/product.api';
import { PaginationComponent } from '@/features/common/pagination/Pagination';
import { Box, Divider, Drawer, Flex, Loader, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ProductStore } from '../ProductStore';
import ProductCard from './ProductCard';
import ProductHeader from './ProductHeader';
import DataTableDemo from './ProductTable';
import Filters from './filters/Filters';

export const ProductList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const productList = ProductStore.useState((s) => s.productList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!productList) {
    return <Text>Aucun produit trouvé</Text>;
  }

  const fetchProducts = async (page: number) => {
    // Called when page is changed
    const api = setupPrivateApi();
    setIsLoading(true);
    const newProductList = await getProductByPage(page, api);
    ProductStore.update((s) => {
      s.productList = newProductList;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);

  // TODO filtres (voir la centrale)
  // Footer avec code départemental + distance en km (demande l'autorisation à l'utilsateur de prendre sa position (useEffect au changement qui va réactualiser tous les produits) puis calcul)
  // Button pour engager la discussion avec le propriétaire du product
  // [OPTIONNEL] Chatbox si need help ?

  return (
    <Flex direction={'column'} align={'center'} gap={'xl'}>
      <ProductHeader />
      <Filters open={open} />
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Flex direction="column" gap={48} px={8} justify={'center'}>
          {productList.results.map((product) => (
            <ProductCard product={product} />
          ))}
        </Flex>
      )}
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />

      {/* Filters */}
      <Drawer opened={opened} onClose={close} title={<Title>Filtres</Title>}>
        <Divider my="sm" />
        {/* From current categories display it filters */}
        <Box></Box>
      </Drawer>

      <DataTableDemo />
    </Flex>
  );
};

export default ProductList;
