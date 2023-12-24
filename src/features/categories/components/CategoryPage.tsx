import { Box, Text, Title } from '@mantine/core';
import { CategoryStore } from '../store';
import { Category } from '../types/Category';

const Categories = () => {
  const categories: Category[] = CategoryStore.useState((s) => s.categoryList);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        paddingTop: '32px',
      }}
    >
      <Title>Categories :</Title>
      {categories.map((category: Category) => (
        <Text key={category.id}>{category.title}</Text>
      ))}
    </Box>
  );
};

export default Categories;
