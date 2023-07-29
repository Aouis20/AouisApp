import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Text,
  createStyles,
  getStylesRef,
} from '@mantine/core';
import {
  IconHeart,
  IconMapPinFilled,
  IconMessageCircle2,
} from '@tabler/icons-react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { PaymentType, Product } from '../types/Product';
import { conditionIcon } from '../variables/Conditions';
import { paymentType } from '../variables/PaymentType';

type ProductCardProps = {
  product: Product;
};

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  control: {
    '&[data-inactive]': {
      opacity: 0,
      cursor: 'default',
    },
  },
  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { classes } = useStyles();

  const handleLike = () => {
    // TODO add product to user wishlist
    // + if product already exists in his wishlist ? IconHeartFilled avec dans ActionIcon(color="pink") : HeartIcon
  };

  const handleDistance = () => {
    // TODO get distance between user and product owner
  };

  const handleProductDetails = () => {
    // TODO go to product details page
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      padding={'md'}
      w={540}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
      key={product.id}
    >
      {/* Images */}
      <Card.Section>
        <>
          <Carousel classNames={classes}>
            {product.images.map((image, index) => (
              <Carousel.Slide key={index}>
                {/* TODO add AspectRatio from mantine */}
                <Image
                  src={image}
                  height={160}
                  alt={product.title + '-image' + index}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
          <ActionIcon
            bg={'white'}
            pos={'absolute'}
            w={40}
            h={40}
            top={6}
            right={6}
            p={4}
            sx={{
              borderRadius: '50%',
              transition: 'color 0.3s ease',
              '&:hover': { color: 'red', animation: 'enlarge 0.3s ease' },
            }}
            onClick={handleLike}
          >
            <IconHeart />
          </ActionIcon>
        </>
      </Card.Section>

      <Flex
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={handleProductDetails}
        direction={'column'}
        gap={12}
        h={'100%'}
      >
        {/* Title + Category */}
        <Group
          position="apart"
          mt="md"
          mb="xs"
          align="start"
          style={{ flexWrap: 'wrap' }}
        >
          <Text sx={{ wordBreak: 'break-word', flex: 1 }} weight={700}>
            {product.title}
          </Text>
          <Flex direction={'column'} gap={8}>
            <Badge color="green" variant="light" fz={14} p={10}>
              {product.price}€
              {product.payment_type != PaymentType.UNIQ &&
                paymentType[product.payment_type]}
            </Badge>
            <Badge color="pink" fz={12}>
              <Group>
                {product.condition} {conditionIcon[product.condition]}
              </Group>
            </Badge>
          </Flex>
        </Group>

        {/* Description */}
        <Text size="md" color="dimmed">
          {product.description}
        </Text>

        {/* Price and owner informations */}
        <Group position="apart" mt="auto">
          <Box>
            <Button
              leftIcon={<IconMapPinFilled size={22} />}
              variant="subtle"
              onClick={handleDistance}
            >
              95
            </Button>
            <Button variant="subtle" radius="md">
              <IconMessageCircle2 size={22} />
            </Button>
            {/* Think about a new feature to make proposal */}
          </Box>
          <Text color="gray" fs={'italic'} fz={'sm'}>
            Vendu par {_.upperFirst(product.user.first_name)}{' '}
            {product.user.last_name.toUpperCase()}
          </Text>
        </Group>
      </Flex>
    </Card>
  );
};

export default ProductCard;
