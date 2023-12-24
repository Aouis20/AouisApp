import { CategoryStore } from '@/features/categories/store';
import { submitSearch } from '@/features/products/api';
import { ProductStore } from '@/features/products/store';
import { ConditionType } from '@/features/products/types/Product';
import { setupPrivateApi } from '@/pages/api';
import {
  Anchor,
  Button,
  Collapse,
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
    <Flex m={'xl'} direction={'column'} align={'center'}>
      <Paper shadow="md" radius={'md'} withBorder p={'xl'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title>{t('content:header.navigation.search')}</Title>
          <Flex gap={'xl'} mt={'md'} wrap={'wrap'}>
            {/* Search Input */}
            <TextInput
              w={300}
              label={t('content:header.navigation.search')}
              placeholder="Voiture, Casque, Meuble ..."
              leftSection={<IconSearch size={18} />}
              {...form.getInputProps('name')}
            />
            {/* Price */}
            <Group wrap="nowrap">
              <NumberInput
                w={160}
                label="Min"
                placeholder="Prix min."
                min={0}
                hideControls
                step={0.5}
                leftSection={<IconCurrencyEuro size={18} />}
                decimalScale={2}
                {...form.getInputProps('min_price')}
              />
              <NumberInput
                w={160}
                label="Max"
                placeholder="Prix max."
                min={0}
                hideControls
                step={0.5}
                leftSection={<IconCurrencyEuro size={18} />}
                decimalScale={2}
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
                  leftSection={<IconArticle size={18} />}
                  clearable
                  searchable
                  data={Object.values(ConditionType)}
                  {...form.getInputProps('conditions')}
                />

                {/* Categories */}
                <MultiSelect
                  leftSection={<IconCategory size={18} />}
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
                  leftSection={<IconMapPinFilled size={18} />}
                  {...form.getInputProps('localization')}
                />
              </Flex>
            </Collapse>
          </Flex>

          <Group justify="space-between">
            <Anchor onClick={toggle}>
              {opened
                ? 'Masquer les réglages avancées'
                : 'Afficher les réglages avancées'}
            </Anchor>

            <Button type="submit">{t('search')}</Button>
          </Group>
        </form>
      </Paper>
      <Image mt={'xl'} src="assets/search/search.svg" w={'50%'} />
    </Flex>
  );
};
