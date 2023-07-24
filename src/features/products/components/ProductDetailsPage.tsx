import { Box, Text, Title } from '@mantine/core';
import React from 'react';
import { ProductStore } from '../ProductStore';

const ProductDetailsPage = () => {
  const product = ProductStore.useState((s) => s.product);
  if (!product) {
    return <Text fs={'italic'}>Produit indisponible</Text>;
  }

  return (
    <Box>
      <Title>{product.title}</Title>
      <Text>{product.description}</Text>
    </Box>
  );
};

export default ProductDetailsPage;
