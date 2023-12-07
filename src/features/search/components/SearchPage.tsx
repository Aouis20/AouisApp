import { CategoryStore } from '@/features/categories/store';
import {
  Anchor,
  Box,
  Checkbox,
  Collapse,
  Container,
  Flex,
  Group,
  HoverCard,
  MultiSelect,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure, useListState } from '@mantine/hooks';
import {
  IconArticle,
  IconCategory,
  IconCurrencyEuro,
  IconMapPinFilled,
  IconSearch,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchPage = () => {
  const { t } = useTranslation('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [opened, { toggle }] = useDisclosure(false);
  const categoryList = CategoryStore.useState((s) => s.categoryList);

  const initialValues = [
    {
      label: 'Receive sms notifications',
      checked: true,
      key: 'unkey2',
    },
    {
      label: 'Receive push notifications',
      checked: true,
      key: 'unkey3',
    },
  ];

  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      my="md"
      ml={33}
      label={<Text>{value.label}</Text>}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, 'checked', event.currentTarget.checked)
      }
    />
  ));

  return (
    <Container size="md">
      <Paper shadow="sm" radius="md" p="lg" withBorder>
        <Title>{t('content:header.navigation.search')}</Title>
        <Flex gap={'md'} mt={'md'}>
          {/* Search Input */}
          <TextInput
            w={300}
            label={t('content:header.navigation.search')}
            placeholder="Voiture, Casque, Meuble ..."
            icon={<IconSearch size={18} />}
          />
          {/* Price */}
          <Group align="start" sx={{ height: '100%' }}>
            <NumberInput
              w={160}
              label="Min"
              placeholder="Prix min."
              value={minPrice}
              min={0}
              onChange={setMinPrice}
              hideControls
              step={0.5}
              icon={<IconCurrencyEuro size={18} />}
              error={
                minPrice > maxPrice &&
                'Veuillez séléctionnez un prix inférieure'
              }
              precision={2}
            />
            <NumberInput
              w={160}
              label="Max"
              placeholder="Prix max."
              value={maxPrice}
              min={0}
              onChange={setMaxPrice}
              hideControls
              step={0.5}
              icon={<IconCurrencyEuro size={18} />}
              error={maxPrice}
              precision={2}
            />
          </Group>
        </Flex>
        <Flex mb={'xl'}>
          <Collapse in={opened}>
            <Flex gap={'xl'} mt={'xl'} wrap={'wrap'}>
              {/* Conditions */}
              <HoverCard
                withArrow
                arrowPosition="center"
                position="bottom-start"
              >
                <HoverCard.Target>
                  <TextInput
                    w={200}
                    label="Conditions"
                    icon={<IconArticle size={18} />}
                  />
                </HoverCard.Target>
                <HoverCard.Dropdown p={28}>
                  <Box>
                    <Checkbox
                      checked={allChecked}
                      indeterminate={indeterminate}
                      label="All"
                      transitionDuration={0}
                      onChange={() =>
                        handlers.setState((current) =>
                          current.map((value) => ({
                            ...value,
                            checked: !allChecked,
                          }))
                        )
                      }
                    />
                    {items}
                  </Box>
                </HoverCard.Dropdown>
              </HoverCard>

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
              />

              {/* Localization */}
              <NumberInput
                w={200}
                label="Localization"
                hideControls
                icon={<IconMapPinFilled size={18} />}
              />
            </Flex>
          </Collapse>
        </Flex>
        <Anchor onClick={toggle}>
          {opened
            ? 'Masquer les réglages avancées'
            : 'Afficher les réglages avancées'}
        </Anchor>
      </Paper>
    </Container>
  );
};
