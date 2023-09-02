import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  RangeSlider,
  Text,
  Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ProductStore } from '../../store';

const PriceFilter = () => {
  const products = ProductStore.useState((s) => s.productList);
  const filters = ProductStore.useState((s) => s.filters);

  if (!products) {
    return <Text>Aucune donnée disponible</Text>;
  }

  const min =
    Math.floor(Number(_.minBy(products.results, 'price')?.price)) || 0;
  const max = Math.ceil(Number(_.maxBy(products.results, 'price')?.price)) || 0;

  // Price
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.price ? filters.price : [min, max]
  );

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

  const handleMinInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setPriceRange([newValue, priceRange[1]]);
    }
  };

  const handleMaxInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setPriceRange([priceRange[0], newValue]);
    }
  };

  const setErrors = (value: number) => {
    const currentValue = value;
    if (_.isNaN(currentValue)) {
      return 'Veuillez entrer un prix valide.';
    }
    if (currentValue < min || currentValue > max) {
      return `Veuillez entrer un prix entre ${min}€ et ${max}€.`;
    }
    // Values are good
    return false;
  };

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
      <Title order={2}>Price</Title>

      {/* Payment types */}
      <Box>
        <Text c={'gray'} mb={12}>
          Préférence de paiement
        </Text>
        <Checkbox
          checked={allChecked}
          indeterminate={indeterminate}
          label="All"
          transitionDuration={0}
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
      <Group align="start" mt={-8}>
        <NumberInput
          label="Min"
          value={priceRange[0]}
          onChange={handleMinInput}
          hideControls
          step={0.5}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          error={setErrors(priceRange[0])}
          precision={2}
        />
        <NumberInput
          label="Max"
          value={priceRange[1]}
          onChange={handleMaxInput}
          hideControls
          step={0.5}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          error={setErrors(priceRange[1])}
          precision={2}
        />
      </Group>

      {/* Price Slider */}
      <RangeSlider
        mt={24}
        px={20}
        radius="lg"
        w={'100%'}
        min={min}
        max={max}
        label={(value) => `${value}€`}
        value={priceRange}
        onChange={(newValue) => {
          setPriceRange([newValue[0], newValue[1]]);
        }}
      />
      <Group
        position="apart"
        w={'100%'}
        mt={'-10px'}
        sx={{ alignSelf: 'center' }}
      >
        <Text color="gray">{min}€</Text>
        <Text color="gray">{max}€</Text>
      </Group>
    </Flex>
  );
};

export default PriceFilter;
