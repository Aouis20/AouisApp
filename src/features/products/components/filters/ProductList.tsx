import { setupPrivateApi } from '@/api';
import { getProducts } from '@/api/product.api';
import { PaginationComponent } from '@/features/common/pagination/Pagination';
import { Flex, Loader, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { ProductStore } from '../../ProductStore';
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
        <Flex direction="column" gap={48} px={8} justify={'center'}>
          {productList.results.map((product) => (
            <ProductCard product={product} cardHeight={cardHeight} />
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
