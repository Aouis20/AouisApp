import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  Text,
  Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ProductStore } from '../../store';

export const PriceFilter = () => {
  const products = ProductStore.useState((s) => s.productList);
  const filters = ProductStore.useState((s) => s.filters);
  const t = useTranslations();

  if (!products) {
    return <Text>{t('noData')}</Text>;
  }

  // Prices
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  // Payments
  // [Payments] Keep existing payments on at least 1 product
  const paymentsFiltered = Object.fromEntries(
    Object.entries(products.payment_types).filter(([key, count]) => count !== 0)
  );
  const paymentData = Object.keys(filters.payment_type).length
    ? filters.payment_type
    : Object.entries(paymentsFiltered).map(([payment, count]) => ({
        label: payment,
        count: count as number,
        checked: true,
      }));
  const [payments, handlers] = useListState(paymentData);
  const allChecked = payments.every((value) => value.checked);
  const indeterminate = payments.some((value) => value.checked) && !allChecked;
  const priceRange: [number, number] = [minPrice as number, maxPrice as number];

  // Update filters in ProductStore
  useEffect(() => {
    ProductStore.update((s) => {
      s.filters = {
        ...s.filters,
        price: priceRange,
        payment_type: payments,
      };
    });
  }, [priceRange, payments]);

  const renderPayments = payments.map((payment, index) => (
    <Checkbox
      mt={8}
      ml={33}
      label={
        <Flex gap={6}>
          <Text>{payment.label}</Text>
          <Badge p={4}>{payment.count}</Badge>
        </Flex>
      }
      key={index}
      checked={payment.checked}
      onChange={(event) =>
        handlers.setItemProp(index, 'checked', event.currentTarget.checked)
      }
    />
  ));

  return (
    <Flex direction={'column'} gap={20} px={16}>
      <Title order={2}>{t('price')}</Title>

      {/* Payment types */}
      <Box>
        <Text c={'gray'} mb={12}>
          Préférence de paiement
        </Text>
        <Checkbox
          checked={allChecked}
          indeterminate={indeterminate}
          label="All"
          onChange={() =>
            handlers.setState((current) =>
              current.map((value) => ({ ...value, checked: !allChecked }))
            )
          }
        />
        {renderPayments}
      </Box>

      {/* Price inputs (min and max) */}
      <Text c={'gray'}>Prix</Text>
      <Group align="start" mt={-10}>
        <NumberInput
          label="Min"
          value={minPrice}
          onChange={setMinPrice}
          allowNegative={false}
          hideControls
          step={0.5}
          min={0.01}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          decimalScale={2}
        />
        <NumberInput
          label="Max"
          value={maxPrice}
          onChange={setMaxPrice}
          allowNegative={false}
          hideControls
          step={0.5}
          min={(minPrice as number) + 0.01}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          decimalScale={2}
        />
      </Group>
    </Flex>
  );
};
