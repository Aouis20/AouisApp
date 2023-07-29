import {
  Badge,
  Center,
  Flex,
  Group,
  NumberInput,
  RangeSlider,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import _ from 'lodash';
import { useState } from 'react';
import { ProductStore } from '../ProductStore';

const PriceFilter = () => {
  const products = ProductStore.useState((s) => s.productList);
  if (!products) {
    return <Text>Aucune donnée disponible</Text>;
  }

  const min = Number(_.minBy(products.results, 'price')?.price) || 0;
  const max = Number(_.maxBy(products.results, 'price')?.price) || 0;

  if (min === max) {
    return <Text>Erreur lors du chargement des produits</Text>;
  }
  const [value, setValue] = useState<[number, number]>([min, max]);

  // Keep existing payments on at least 1 product
  const payments = Object.fromEntries(
    Object.entries(products.payment_types).filter(([key, count]) => count !== 0)
  );

  // Segments data
  const data = Object.entries(payments).map(([payment, count]) => ({
    value: payment,
    label: (
      <Center>
        <Badge p={6} mr={6}>
          {count}
        </Badge>
        <Text>{payment}</Text>
      </Center>
    ),
  }));

  const handlePaymentType = () => {
    // TODO Make a new request to get news products filtered by current payment type
  };

  const handleMinInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setValue([newValue, value[1]]);
    }
  };

  const handleMaxInput = (newValue: number) => {
    if (!Number.isNaN(newValue)) {
      setValue([newValue, value[1]]);
    }
  };

  const setErrors = (value: number) => {
    const currentValue = value;
    if (_.isNaN(currentValue)) {
      return 'Veuillez entrer un prix valide.';
    }
    if (currentValue < min || currentValue > max) {
      return `Veuillez entrer un prix entre ${min.toFixed(2)}€ et ${max.toFixed(
        2
      )}€.`;
    }

    // Values are good
    return false;
  };

  return (
    <Flex direction={'column'} gap={16} px={24}>
      <Title order={2}>Price range</Title>
      {/* TODO Mettre un SegmentedControl (Mantine) Entre payment type */}
      <SegmentedControl data={data} onChange={handlePaymentType} />
      <Group align="start">
        <NumberInput
          label="Min"
          value={value[0]}
          onChange={handleMinInput}
          hideControls
          step={0.5}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          error={setErrors(value[0])}
          precision={2}
        />
        <NumberInput
          label="Max"
          value={value[1]}
          onChange={handleMaxInput}
          hideControls
          step={0.5}
          style={{ maxWidth: '40%' }}
          rightSection={'€'}
          error={setErrors(value[1])}
          precision={2}
        />
      </Group>
      <RangeSlider
        mt={24}
        radius="lg"
        w={'100%'}
        min={min}
        max={max}
        label={(value) => `${value}€`}
        value={value}
        onChange={(newValue) => setValue([newValue[0], newValue[1]])}
      />
      <Group
        position="apart"
        w={'110%'}
        mt={'-10px'}
        sx={{ alignSelf: 'center' }}
      >
        <Text color="gray">{min.toFixed(2)}€</Text>
        <Text color="gray">{max.toFixed(2)}€</Text>
      </Group>
    </Flex>
  );
};

export default PriceFilter;