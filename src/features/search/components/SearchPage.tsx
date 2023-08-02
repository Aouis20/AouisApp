import {
  Box,
  Checkbox,
  Container,
  Flex,
  Group,
  HoverCard,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import {
  IconArticle,
  IconCategory,
  IconCode,
  IconCurrencyEuro,
  IconMapPinFilled,
  IconSearch,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SearchPage = () => {
  const { t } = useTranslation('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const initialValues = [
    {
      label: 'Receive sms notifications',
      checked: true,
      key: 'unkey2',
      icon: IconCode,
    },
    {
      label: 'Receive push notifications',
      checked: true,
      key: 'unkey3',
      icon: IconCode,
    },
  ];

  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      my="md"
      ml={33}
      label={
        <Group>
          <value.icon size={16} />
          <Text>{value.label}</Text>
        </Group>
      }
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
        <Title>Search</Title>
        <Flex gap={'xl'} mt={'xl'} wrap={'wrap'}>
          {/* Search Input */}
          <TextInput
            w={300}
            label={t('common:navigation.search')}
            placeholder="Voiture, Casque, Meuble ..."
            icon={<IconSearch size={18} />}
          />

          {/* Categories */}
          <HoverCard withArrow arrowPosition="center" position="bottom-start">
            <HoverCard.Target>
              <TextInput
                w={200}
                label="Catégories"
                icon={<IconCategory size={18} />}
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

          {/* Price */}
          <Group>
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

          {/* Conditions */}
          <HoverCard withArrow arrowPosition="center" position="bottom-start">
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

          {/* Localization */}
          <NumberInput
            w={200}
            label="Localization"
            hideControls
            icon={<IconMapPinFilled size={18} />}
          />
        </Flex>
      </Paper>
    </Container>
  );
};

export default SearchPage;
