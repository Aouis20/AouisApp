import {
  Badge,
  Center,
  Flex,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { ProductStore } from '../ProductStore';

const ConditionFilter = () => {
  const products = ProductStore.useState((s) => s.productList);
  if (!products) {
    return <Text>Aucune donnée disponible</Text>;
  }

  const [value, setValue] = useState<string>('');

  // Keep existing payments on at least 1 product
  const conditions = Object.fromEntries(
    Object.entries(products.conditions).filter(([key, count]) => count !== 0)
  );

  // Segments data
  const data = Object.entries(conditions).map(([condition, count]) => ({
    value: condition,
    label: (
      <Center>
        <Badge p={6} mr={6}>
          {count}
        </Badge>
        <Text>{condition}</Text>
      </Center>
    ),
  }));

  const handleConditionType = () => {
    // TODO Make a new request to get news products filtered by current condition type
  };

  return (
    <Flex direction={'column'} gap={16} px={24}>
      <Title order={2}>Price range</Title>
      {/* TODO Mettre un SegmentedControl (Mantine) Entre payment type */}
      <SegmentedControl data={data} onChange={handleConditionType} />
    </Flex>
  );
};

export default ConditionFilter;