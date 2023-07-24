import { Badge, Button, Flex, Paper, Text, Title } from '@mantine/core';
import { IconAdjustments, IconTag, IconArticle } from '@tabler/icons-react';
import React from 'react';

type ProductHeaderProps = {
  open: () => void;
};

const ProductHeader = ({ open }: ProductHeaderProps) => {
  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
      <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
        <Text pos={'absolute'} top={0} fs={'italic'} color="#757575">
          Accueil/products/cars
        </Text>
        <Title>Tous les produits</Title>
        <Badge fz={'sm'} p={12}>
          (1432) annonces
        </Badge>
        <Flex gap={'sm'}>
          <Button leftIcon={<IconAdjustments />} onClick={open}>
            Filters
          </Button>
          <Button leftIcon={<IconTag />}>Price</Button>
          <Button leftIcon={<IconArticle />}>Condition</Button>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default ProductHeader;
