import { CategoryStore } from '@/features/categories/store';
import { Anchor, Breadcrumbs, Flex, Paper, Text, Title } from '@mantine/core';

const ProductHeader = () => {
  const category = CategoryStore.useState((s) => s.category);

  const items = [
    { title: 'Accueil', href: '/' },
    { title: 'Categories', href: '/categories' },
    { title: category?.title, href: '#' },
  ];

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
      <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
        <Text pos={'absolute'} top={0} fs={'italic'} color="#757575">
          {/* TODO voir sur mantine Breacrumbs */}
          <Breadcrumbs separator="→" mt="xs">
            {items.map((item, index) => (
              <Anchor href={item.href} key={index}>
                {item.title}
              </Anchor>
            ))}
          </Breadcrumbs>
        </Text>
        <Title>{category ? category.title : 'Tous les produits'}</Title>
      </Flex>
    </Paper>
  );
};

export default ProductHeader;
