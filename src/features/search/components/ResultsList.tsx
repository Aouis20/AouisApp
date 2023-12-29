import { PaginationComponent } from '@/common/pagination/Pagination';
import { submitSearch } from '@/features/products/api';
import { ProductCard } from '@/features/products/components/ProductCard';
import { ProductStore } from '@/features/products/store';
import { setupPrivateApi } from '@/pages/api';
import { Box, Button, Flex, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconArrowBack } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SkeletonLoadingCard } from './SkeletonLoadingCard';

type ProductListProps = {
  display?: 'column' | 'row';
};

export const ResultsList = ({ display = 'column' }: ProductListProps) => {
  const productList = ProductStore.useState((s) => s.productList);
  const searchValues = ProductStore.useState((s) => s.search);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState(1);
  const router = useRouter();
  const t = useTranslations();

  const fetchProducts = async (page: number) => {
    // Called when page is changed
    const api = setupPrivateApi();
    setIsLoading(true);
    const newProductList = await submitSearch(page, searchValues, api);
    ProductStore.update((s) => {
      s.productList = newProductList;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);

  if (!productList || productList.total_items === 0) {
    return (
      <Stack align="center" mt={'xl'}>
        <Text fs={'italic'} fz={'lg'}>
          {t('noData')}
        </Text>
        <Group>
          <Button
            variant="outline"
            leftSection={<IconArrowBack />}
            onClick={() => router.back()}
          >
            {t('searchpage.results.backToSearch')}
          </Button>
          <Button onClick={() => router.push('/products/')}>
            {t('searchpage.results.seeSomeAds')}
          </Button>
        </Group>
      </Stack>
    );
  }

  return (
    <Flex direction={'column'} gap={48}>
      <PaginationComponent
        page={activePage}
        setPage={setPage}
        total={productList.total_pages}
      />
      {isLoading ? (
        showNotification({
          title: t('searchpage.notifications.success.title'),
          message: t('searchpage.notifications.success.message'),
          color: 'primary.4',
          loading: true,
          withCloseButton: false,
        }) && <SkeletonLoadingCard />
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
