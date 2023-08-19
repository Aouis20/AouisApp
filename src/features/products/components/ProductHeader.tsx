import { Flex, Paper, Text, Title } from '@mantine/core';

const ProductHeader = () => {
  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder w={'80%'} pos={'relative'}>
      <Flex direction={'column'} align={'center'} gap={'lg'} pt={16}>
        <Text pos={'absolute'} top={0} fs={'italic'} color="#757575">
          {/* TODO voir sur mantine Breacrumbs */}
          Accueil/products/cars
        </Text>
        <Title>Others category</Title>
      </Flex>
    </Paper>
  );
};

export default ProductHeader;
