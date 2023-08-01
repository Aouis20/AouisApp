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
import { useState } from 'react';
import { ProductStore } from '../../ProductStore';

const PriceFilter = () => {
  const products = ProductStore.useState((s) => s.productList);

  if (!products) {
    return <Text>Aucune donnée disponible</Text>;
  }

  const min =
    Math.floor(Number(_.minBy(products.results, 'price')?.price)) || 0;
  const max = Math.ceil(Number(_.maxBy(products.results, 'price')?.price)) || 0;
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);

  // Payments
  // Keep existing payments on at least 1 product
  const paymentsFiltered = Object.fromEntries(
    Object.entries(products.payment_types).filter(([key, count]) => count !== 0)
  );
  const paymentData = Object.entries(paymentsFiltered).map(
    ([payment, count]) => ({
      label: payment,
      count: count,
      checked: false,
    })
  );
  const [values, handlers] = useListState(paymentData);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleMinInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setPriceRange([newValue, priceRange[1]]);
    }
  };

  const handleMaxInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setPriceRange([newValue, priceRange[1]]);
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

  const payments = values.map((value, index) => (
    <Checkbox
      mt={8}
      ml={33}
      label={
        <Flex gap={6}>
          <Text>{value.label}</Text>
          <Badge p={4}>{value.count}</Badge>
        </Flex>
      }
      key={index}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, 'checked', event.currentTarget.checked)
      }
    />
  ));

  return (
    <Flex direction={'column'} gap={16} px={16}>
      <Title order={2}>Price</Title>

      {/* Payment types */}
      <Text>Préférence de paiement</Text>
      <Box>
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
        {payments}
      </Box>

      {/* Price inputs (min and max) */}
      <Group align="start">
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
