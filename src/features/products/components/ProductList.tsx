import { PaginationComponent } from '@/common/pagination/Pagination';
import { getProducts } from '@/features/products/api';
import { SkeletonLoadingCard } from '@/features/search/components/SkeletonLoadingCard';
import { setupPrivateApi } from '@/pages/api';
import { Box, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ProductStore } from '../store';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  display?: 'column' | 'row';
  user_id?: number;
  ids?: number[];
  category_id?: number;
};

export const ProductList = ({
  display = 'column',
  user_id,
  ids,
  category_id
}: ProductListProps) => {
  const productList = ProductStore.useState((s) => s.productList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState(1);
  const t = useTranslations();

  if (!productList || productList.total_items === 0) {
    return (
      <Text fs={'italic'} fz={'lg'}>
        {t('noData')}
      </Text>
    );
  }

  const fetchProducts = async (page: number) => {
    // Called when page is changed
    const api = setupPrivateApi();
    setIsLoading(true);
    const newProductList = await getProducts(page, { user_id, ids, category_id }, api);
    ProductStore.update((s) => {
      s.productList = newProductList;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);

  return (
    <Flex direction={'column'} gap={48}>
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
      {isLoading ? (
        <SkeletonLoadingCard />
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
    </Flex>
  );
};
