import {
  Badge,
  Button,
  Flex,
  Group,
  HoverCard,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { IconAdjustments, IconArticle, IconTag } from '@tabler/icons-react';
import { ProductStore } from '../ProductStore';
import PriceFilter from './PriceFilter';

type ProductHeaderProps = {
  open: () => void;
};

const ProductHeader = ({ open }: ProductHeaderProps) => {
  const totalItems = ProductStore.useState((s) => s.productList?.total_items);

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
              <PriceFilter />
            </HoverCard.Dropdown>
          </HoverCard>

          <Button leftIcon={<IconArticle />}>Condition</Button>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default ProductHeader;
