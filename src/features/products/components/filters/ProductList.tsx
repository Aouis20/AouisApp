import { PaginationComponent } from '@/common/pagination/Pagination';
import { getProducts } from '@/features/products/api';
import { setupPrivateApi } from '@/pages/api';
import { Box, Flex, Loader, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { ProductStore } from '../../store';
import ProductCard from '../ProductCard';

const ProductList = () => {
  const productList = ProductStore.useState((s) => s.productList);
  const cardHeight = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState(1);

  if (!productList || productList.total_items === 0) {
    return (
      <Text fs={'italic'} fz={'lg'}>
        Aucun produit trouvé
      </Text>
    );
  }

  const fetchProducts = async (page: number) => {
    // Called when page is changed
    const api = setupPrivateApi();
    setIsLoading(true);
    const newProductList = await getProducts(page, {}, api);
    ProductStore.update((s) => {
      s.productList = newProductList;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);
  return (
    <>
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Flex
          direction="column"
          gap={48}
          px={8}
          justify={'center'}
          align={'center'}
        >
          {productList.results.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} cardHeight={cardHeight} />
            </Box>
          ))}
        </Flex>
      )}
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
    </>
  );
};

export default ProductList;
