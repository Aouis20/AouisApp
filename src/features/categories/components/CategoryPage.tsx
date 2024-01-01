import {
  Badge,
  Box,
  Flex,
  Group,
  Overlay,
  Paper,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { CategoryStore } from '../store';
import { useRouter } from 'next/router';

export const Categories = () => {
  const categoryList = CategoryStore.useState((s) => s.categoryList);
  const t = useTranslations();
  const router = useRouter();
  const items = categoryList.map((category) => (
    <UnstyledButton
      style={{
        backgroundImage: `url(https://cdn.pixabay.com/photo/2023/11/29/11/55/pine-hills-8419433_1280.jpg)`,
        height: rem('160px'),
        position: 'relative',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        color: 'white',
        borderRadius: 14,
        margin: 16,
        overflow: 'hidden',
        transition: 'backgroundSize 300ms ease',
      }}
      key={category.title}
      onClick={() => router.push(`/categories/${category.id}`)}
    >
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text
        size="xl"
        ta="center"
        fw={700}
        style={{ color: 'white', zIndex: 2, position: 'relative' }}
      >
        {category.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Box mx={'xl'}>
      <Group justify="center" mb={'xl'}>
        <Paper
          shadow="sm"
          radius="md"
          p="xl"
          withBorder
          w={'50%'}
          pos={'relative'}
        >
          <Flex direction={'column'} gap={'lg'} align={'center'}>
            <Title>{t('header.navigation.categories')}</Title>

            <Badge fz={'sm'} p={'sm'} tt={'lowercase'} variant="light">
              {categoryList.length}{' '}
              {t('header.navigation.categories').toLowerCase()}
            </Badge>
          </Flex>
        </Paper>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{items}</SimpleGrid>
    </Box>
  );
};
