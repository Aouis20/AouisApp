import ProductPage from '@/features/products/components/ProductPage';
import { Text } from '@mantine/core';
import { CategoryStore } from '../store';

const CategoryDetailsPage = () => {
  const category = CategoryStore.useState((s) => s.category);

  if (!category) {
    return <Text fs={'italic'}>Category indisponible</Text>;
  }

  return <ProductPage />;
};

export default CategoryDetailsPage;
