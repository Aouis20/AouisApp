import {
  Badge,
  Button,
  Center,
  Flex,
  Group,
  HoverCard,
  Paper,
  RangeSlider,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import { IconAdjustments, IconArticle, IconTag } from '@tabler/icons-react';
import _ from 'lodash';
import { useState } from 'react';
import { ProductStore } from '../ProductStore';

type ProductHeaderProps = {
  open: () => void;
};

const ProductHeader = ({ open }: ProductHeaderProps) => {
  const totalItems = ProductStore.useState((s) => s.productList?.total_items);
  const products = ProductStore.useState((s) => s.productList);
  if (!products) {
    return <Text>Aucune donnée disponible</Text>;
  }
  const min = _.minBy(products.results, 'price').price;
  const max = _.maxBy(products.results, 'price').price;
  const [value, setValue] = useState([min, max]);

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

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
      <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
        <Text pos={'absolute'} top={0} fs={'italic'} color="#757575">
          {/* TODO voir sur mantine Breacrumbs */}
          Accueil/products/cars
        </Text>
        <Title>Others category</Title>
        <Group>
          <Badge fz={'sm'} p={12}>
            {totalItems} annonces
          </Badge>
        </Group>

        <Flex gap={'sm'}>
          {/* Filters */}
          <Button leftIcon={<IconAdjustments />} onClick={open}>
            Filters
          </Button>

          {/* Price */}
          <HoverCard withArrow arrowPosition="center" width={400}>
            <HoverCard.Target>
              <Button leftIcon={<IconTag />}>Price</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Flex direction={'column'} gap={48}>
                {/* TODO Mettre un SegmentedControl (Mantine) Entre payment type */}
                <SegmentedControl data={data} />
                <RangeSlider
                  radius="lg"
                  min={Number(min)}
                  max={Number(max)}
                  labelAlwaysOn
                  label={(value) => `${value}€`}
                  marks={[{ value: 20 }, { value: 50 }, { value: 80 }]}
                  onChange={setValue}
                />
              </Flex>
            </HoverCard.Dropdown>
          </HoverCard>

          <Button leftIcon={<IconArticle />}>Condition</Button>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default ProductHeader;
