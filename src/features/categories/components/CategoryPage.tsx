import {
  Autocomplete,
  Card,
  Container,
  Flex,
  Group,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCode, IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { CategoryStore } from '../store';
import { Category } from '../types/Category';

const CategoryPage = () => {
  const categories = CategoryStore.useState((s) => s.categoryList);
  const router = useRouter();

  return (
    <Container>
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title>Categories</Title>
        <Text>Retrouvez ici, toutes les catégories disponibles !</Text>
      </Paper>
      <Autocomplete
        label="Rechercher une catégorie"
        placeholder="Rechercher"
        data={categories.map((category) => category.title)}
        icon={<IconSearch size={16} />}
        w={'24rem'}
        mt={'md'}
      />
      <Flex mt={'xl'} wrap={'wrap'} gap={'lg'}>
        {categories.map((category: Category) => (
          <Card
            shadow="sm"
            radius="md"
            withBorder
            sx={{
              '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease',
              },
            }}
            onClick={() => router.push(`categories/${category.id}`)}
          >
            <Group p={0}>
              <ThemeIcon size={34} variant="default" radius="md" c={'indigo'}>
                <IconCode />
              </ThemeIcon>
              <Text key={category.id}>{category.title}</Text>
            </Group>
          </Card>
        ))}
      </Flex>
    </Container>
  );
};

export default CategoryPage;
