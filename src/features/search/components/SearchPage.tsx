import { CategoryStore } from '@/features/categories/store';
import { submitSearch } from '@/features/products/api';
import { ProductStore } from '@/features/products/store';
import { ConditionType } from '@/features/products/types/Product';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  AspectRatio,
  Button,
  Collapse,
  Container,
  Flex,
  Group,
  Image,
  MultiSelect,
  NumberInput,
  Paper,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArticle,
  IconCategory,
  IconCurrencyEuro,
  IconMapPinFilled,
  IconSearch,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { SearchPayload } from '../types/SearchPayload';

export const SearchPage = () => {
  const { t } = useTranslation('');
  const [opened, { toggle }] = useDisclosure(false);
  const categoryList = CategoryStore.useState((s) => s.categoryList);
  const router = useRouter();
  const form = useForm<SearchPayload>({
    initialValues: {
      name: '',
      min_price: 0,
      max_price: 100,
      conditions: [],
      categories: [],
      localization: '',
    },
  });

  const handleSubmit = async () => {
    try {
      const api = setupPrivateApi();
      const products = await submitSearch(form.values, api);
      ProductStore.update((s) => {
        s.productList = products;
      });
      router.push('/products/search');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper shadow="sm" radius="md" p="lg" withBorder>
          <Title>{t('content:header.navigation.search')}</Title>
          <Flex gap={'md'} mt={'md'}>
            {/* Search Input */}
            <TextInput
              w={300}
              label={t('content:header.navigation.search')}
              placeholder="Voiture, Casque, Meuble ..."
              icon={<IconSearch size={18} />}
              {...form.getInputProps('name')}
            />
            {/* Price */}
            <Group>
              <NumberInput
                w={160}
                label="Min"
                placeholder="Prix min."
                min={0}
                hideControls
                step={0.5}
                icon={<IconCurrencyEuro size={18} />}
                precision={2}
                {...form.getInputProps('min_price')}
              />
              <NumberInput
                w={160}
                label="Max"
                placeholder="Prix max."
                min={0}
                hideControls
                step={0.5}
                icon={<IconCurrencyEuro size={18} />}
                precision={2}
                {...form.getInputProps('max_price')}
              />
            </Group>
          </Flex>
          <Flex mb={'xl'}>
            <Collapse in={opened}>
              <Flex gap={'xl'} mt={'xl'} wrap={'wrap'}>
                {/* Conditions */}
                <MultiSelect
                  label="Conditions"
                  icon={<IconArticle size={18} />}
                  clearable
                  searchable
                  data={Object.values(ConditionType)}
                  {...form.getInputProps('conditions')}
                />

                {/* Categories */}
                <MultiSelect
                  icon={<IconCategory size={18} />}
                  label="Categories"
                  searchable
                  clearable
                  data={categoryList.map((category) => ({
                    value: String(category.id),
                    label: category.title,
                  }))}
                  {...form.getInputProps('categories')}
                />

                {/* Localization */}
                <NumberInput
                  w={200}
                  label="Localization"
                  hideControls
                  icon={<IconMapPinFilled size={18} />}
                  {...form.getInputProps('localization')}
                />
              </Flex>
            </Collapse>
          </Flex>

          <Group position="apart">
            <Anchor onClick={toggle}>
              {opened
                ? 'Masquer les réglages avancées'
                : 'Afficher les réglages avancées'}
            </Anchor>

            <Button type="submit">Rechercher</Button>
          </Group>
        </Paper>
        <AspectRatio ratio={16 / 9} style={{ zoom: 2 }}>
          <Image src="assets/search/search.svg" />
        </AspectRatio>
      </form>
    </Container>
  );
};
