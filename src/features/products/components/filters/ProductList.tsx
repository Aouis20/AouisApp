import { PaginationComponent } from '@/common/pagination/Pagination';
import { getProducts } from '@/features/products/api';
import { setupPrivateApi } from '@/pages/api';
import { Box, Flex, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ProductStore } from '../../store';
import ProductCard from '../ProductCard';

type ProductListProps = {
  display?: 'column' | 'row';
};

const ProductList = ({ display = 'column' }: ProductListProps) => {
  const productList = ProductStore.useState((s) => s.productList);
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
          direction={display}
          gap={48}
          px={8}
          wrap={'wrap'}
          justify={'center'}
          align={'center'}
        >
          {productList.results.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
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
