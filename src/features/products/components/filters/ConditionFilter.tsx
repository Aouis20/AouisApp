import { Badge, Box, Checkbox, Flex, Text, Title } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { ProductStore } from '../../store';

export const ConditionFilter = () => {
  const t = useTranslations();
  const products = ProductStore.useState((s) => s.productList);
  if (!products) {
    return <Text>{t('noData')}</Text>;
  }

  // Conditions
  // Keep existing conditions on at least 1 product
  const conditionFiltered = Object.fromEntries(
    Object.entries(products.conditions).filter(([key, count]) => count !== 0)
  );
  const conditions = Object.entries(conditionFiltered).map(
    ([condition, count]) => ({
      label: condition,
      count: count,
      checked: true,
    })
  );
  const [values, handlers] = useListState(conditions);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleConditionType = () => {
    // TODO Make a new request to get news products filtered by current condition type
  };

  const renderConditions = values.map((value, index) => (
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
      <Title order={2}>Condition</Title>
      {/* Conditions */}
      <Box>
        <Text c={'gray'} mb={12}>
          Conditions
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
        {renderConditions}
      </Box>
    </Flex>
  );
};
