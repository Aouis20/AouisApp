import React from 'react';
import { Product } from '../types/Product';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from '@mantine/core';
import {
  IconHeart,
  IconMapPinFilled,
  IconMessageCircle2,
} from '@tabler/icons-react';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  };

  const handleDistance = () => {
    // TODO get distance between user and product owner
  };

  const handleProductDetails = () => {
    // TODO go to product details page
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      padding={'md'}
      w={360}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      key={product.id}
    >
      {/* Image */}
      <Card.Section onClick={handleProductDetails}>
        <>
          <Image
            src={product.images[0]}
            height={160}
            alt={product.title + 'banner'}
          />
          <ActionIcon
            bg={'white'}
            pos={'absolute'}
            w={40}
            h={40}
            top={10}
            right={10}
            p={4}
            sx={{ borderRadius: '50%' }}
            onClick={handleLike}
          >
            <IconHeart />
          </ActionIcon>
        </>
      </Card.Section>

      {/* Title + Category */}
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700}>{product.title}</Text>
        <Badge color="pink" variant="light">
          {product.category.name}
        </Badge>
      </Group>

      {/* Description */}
      <Text size="md" color="dimmed" style={{ flexGrow: 1 }}>
        {product.description}
      </Text>

      {/* Localization and Contact */}
      <Group position="apart">
        <Button variant="subtle" radius="md">
          <IconMessageCircle2 />
        </Button>
        <Button
          leftIcon={<IconMapPinFilled />}
          variant="subtle"
          onClick={handleDistance}
        >
          95
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;
